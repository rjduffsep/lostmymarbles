import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CpuUsageService } from 'src/app/services/cpu-usage.service';

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.scss']
})
export class CpuUsageComponent {
  public cpuUsage: Observable<number>;

  constructor(private cpuUsageService:CpuUsageService) {
    this.cpuUsage = this.cpuUsageService.getCpuUsage();
   }

}
