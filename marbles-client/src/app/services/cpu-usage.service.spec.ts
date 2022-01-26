import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, interval, map, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

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

describe('CpuUsageService with Marbles', () => {
  let service: CpuUsageService;
  let mockEndpoint: EndpointsService;
  let mockGetReturn: BehaviorSubject<number>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    });
    mockGetReturn = new BehaviorSubject<number>(0);
    mockEndpoint = jasmine.createSpyObj('EndpointsSerivce', {
      getHttp: mockGetReturn.asObservable()
    }) as EndpointsService;
    TestBed.configureTestingModule({providers: [
      { provide: EndpointsService, useValue: mockEndpoint }
    ]});
    service = TestBed.inject(CpuUsageService);
  });

  fit('should return current values of usage', () => {
    const expectedValues = { a: 11.1, b: 22.2, c: 33.3, d: 44.4 };

    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      cold('1s a 1s b 1s c 1s (d|)', expectedValues).subscribe(mockGetReturn);

      expectObservable(service.getCpuUsage().pipe(take(4))).toBe('x', {x: 0});
    });
  });

  const heroes = ['Batman', 'Spiderman', 'Dr Strange', 'Ironman'];

  const callHeroes = () => interval(1000).pipe(take(heroes.length), map((i) => heroes[i]));

  it('returns hero after each second', () => {
    testScheduler.run(helpers => {
      const { expectObservable } = helpers;
      const expectedMarble = '1s a 999ms b 999ms c 999ms (d|)';
      const expectedValues = { a: 'Batman', b: 'Spiderman', c: 'Dr Strange', d: 'Ironman' };
      expectObservable(callHeroes()).toBe(expectedMarble, expectedValues);
    })
  })
});