import { fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { DateService, timeout } from './date.service';
import { EndpointsService } from './endpoints.service';

describe('DateService', () => {
  let service: DateService;
  let mockEndpoint: EndpointsService;
  let mockGetReturn: BehaviorSubject<number>;

  beforeEach(() => {
    mockGetReturn = new BehaviorSubject<number>(0);
    mockEndpoint = jasmine.createSpyObj('EndpointsSerivce', {
      getHttp: mockGetReturn.asObservable()
    }) as EndpointsService;
    jasmine.clock().install();
    TestBed.configureTestingModule({providers: [
      {provide: EndpointsService, useValue: mockEndpoint}
    ]});
    service = TestBed.inject(DateService);
  });
  
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 initially', done => {
    const expected = 0;

    service.getNow().subscribe((now) => {
      expect(now).toEqual(expected);
      done();
    });
  });
  
  it('should return current value of date', done => {
    const expected = 111;
    mockGetReturn.next(expected);
    jasmine.clock().tick(timeout + 1);
    expect(mockEndpoint.getHttp).toHaveBeenCalled();
    
    service.getNow().subscribe((now) => {
      expect(now).toEqual(expected);
      done();
    })
  });
});
