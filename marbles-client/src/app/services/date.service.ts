import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { EndpointsService } from './endpoints.service';

type DateJson = { now: number };

export const timeout = 100;

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private now: BehaviorSubject<number>;

  constructor(private endpoints: EndpointsService) {
    this.now = new BehaviorSubject<number>(0);
    setInterval(
      () => this.endpoints.getHttp('http://localhost:3000/date', (json: DateJson) => json.now).subscribe((n: number) => this.now.next(n))
    , timeout);
  }

  getNow(): Observable<number> {
    return this.now.asObservable();
  }
}
