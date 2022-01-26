import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, interval, map, Observable, Subject, switchMap, switchMapTo, tap } from 'rxjs';
import { EndpointsService } from './endpoints.service';

export const CPU_USAGE_HEARTBEAT_MS = 1000;
type CpuUsageJson = { cpu: number };

@Injectable({
  providedIn: 'root'
})
export class CpuUsageService {
  private cpuUsage: Subject<number>;

  constructor(private endpoints:EndpointsService) {
    this.cpuUsage = new Subject<number>();

    interval(CPU_USAGE_HEARTBEAT_MS).pipe(
      concatMap(() => this.endpoints.getHttp('http://localhost:3001/cpu', (json: CpuUsageJson) => json.cpu))
    ).subscribe(this.cpuUsage);
  }

  getCpuUsage(): Observable<number> {
    return this.cpuUsage.asObservable();
  }
}
