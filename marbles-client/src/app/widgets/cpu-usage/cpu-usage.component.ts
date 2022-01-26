import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CpuUsageService } from 'src/app/services/cpu-usage.service';

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.scss']
})
export class CpuUsageComponent {
  public cpuUsage: Observable<string | number>;

  constructor(private dateService:CpuUsageService) {
    this.cpuUsage = this.dateService.getCpuUsage();
   }

}
