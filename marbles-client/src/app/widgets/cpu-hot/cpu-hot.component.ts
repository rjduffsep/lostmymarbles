import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subject, Subscription } from 'rxjs';
import { CpuUsageService } from 'src/app/services/cpu-usage.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-cpu-hot',
  templateUrl: './cpu-hot.component.html',
  styleUrls: ['./cpu-hot.component.scss']
})
export class CpuHotComponent implements OnInit {
  public hotTime: Subject<number>;
  public isCpuHot: BehaviorSubject<boolean>;
  private startHot: number = 0;
  private timeSub?: Subscription = undefined;

  constructor(private cpuUsage: CpuUsageService, private time: DateService) {
    this.isCpuHot = new BehaviorSubject<boolean>(false);
    this.hotTime = new Subject<number>();
    this.cpuUsage.getCpuUsage().pipe(map((v) => v > 0.9)).subscribe(this.isCpuHot);
    this.isCpuHot.subscribe((hot) => {
      if (hot) { 
        this.timeSub = this.time.getNow().subscribe((t: number) => {
          this.startHot === 0
            ? this.startHot = t
            : this.hotTime.next((t - this.startHot) / 1000)
        })
      } else {
        this.startHot = 0;
        this.timeSub?.unsubscribe();
      }
    }); 
  }

  ngOnInit(): void {
  }

}
