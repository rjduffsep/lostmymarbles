import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { EndpointsService } from './endpoints.service';

type CpuUsageJson = { cpu: number };
const timeout = 1000;

@Injectable({
  providedIn: 'root'
})
export class CpuUsageService {
  private cpuUsage: BehaviorSubject<string | number>;

  constructor(private endpoints:EndpointsService) {
    this.cpuUsage = new BehaviorSubject<string | number>(0);

    setInterval(
      () => this.endpoints.getHttp('http://localhost:3001/cpu', (json: CpuUsageJson) => json.cpu).subscribe((c: number) => this.cpuUsage.next(c))
    , timeout);
  }

  getCpuUsage(): Observable<string | number> {
    return this.cpuUsage.asObservable();
  }
}
