import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private restEndpoint: HttpClient) { }

  public getHttp(url:string, parser: any): Observable<number> {
    return this.restEndpoint.get(url).pipe(map(parser));
  }
}
