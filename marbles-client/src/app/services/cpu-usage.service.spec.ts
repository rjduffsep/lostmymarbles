import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { CpuUsageService } from './cpu-usage.service';
import { EndpointsService } from './endpoints.service';

describe('CpuUsageService', () => {
  let service: CpuUsageService;
  let mockEndpoint: EndpointsService;
  let mockGetReturn: BehaviorSubject<number>;

  beforeEach(() => {
    mockGetReturn = new BehaviorSubject<number>(0);
    mockEndpoint = jasmine.createSpyObj('EndpointsSerivce', {
      getHttp: mockGetReturn.asObservable()
    }) as EndpointsService;
    TestBed.configureTestingModule({providers: [
      {provide: EndpointsService, useValue: mockEndpoint}
    ]});
    service = TestBed.inject(CpuUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
