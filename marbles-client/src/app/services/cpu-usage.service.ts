import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndpointsService } from './endpoints.service';

export const CPU_USAGE_HEARTBEAT_MS = 1000;
type CpuUsageJson = { cpu: number };

@Injectable({
  providedIn: 'root'
})
export class CpuUsageService {
  private cpuUsage: BehaviorSubject<number>;

  constructor(private endpoints:EndpointsService) {
    this.cpuUsage = new BehaviorSubject<number>(0);

    setInterval(
      () => this.endpoints.getHttp('http://localhost:3001/cpu', (json: CpuUsageJson) => json.cpu).subscribe((c: number) => this.cpuUsage.next(c))
    , CPU_USAGE_HEARTBEAT_MS);
  }

  getCpuUsage(): Observable<number> {
    return this.cpuUsage.asObservable();
  }
}
