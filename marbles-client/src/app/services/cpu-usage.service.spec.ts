import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { CpuUsageService, CPU_USAGE_HEARTBEAT_MS } from './cpu-usage.service';
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
    jasmine.clock().install();
    TestBed.configureTestingModule({providers: [
      { provide: EndpointsService, useValue: mockEndpoint }
    ]});
    service = TestBed.inject(CpuUsageService);
  });
  
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 initially', done => {
    const expected = 0;

    service.getCpuUsage().subscribe((usage) => {
      expect(usage).toEqual(expected);
      done();
    });
  });
  
  it('should return current values of usage', done => {
    const expected = 11.1;
    mockGetReturn.next(expected);
    jasmine.clock().tick(CPU_USAGE_HEARTBEAT_MS + 1);
    expect(mockEndpoint.getHttp).toHaveBeenCalled();
    
    service.getCpuUsage().subscribe((usage) => {
      expect(usage).toEqual(expected);
      done();
    })
  });
});
