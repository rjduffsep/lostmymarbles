import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { CpuUsageService } from 'src/app/services/cpu-usage.service';
import { DateService } from 'src/app/services/date.service';

import { CpuHotComponent } from './cpu-hot.component';

describe('CpuHotComponent', () => {
  let component: CpuHotComponent;
  let fixture: ComponentFixture<CpuHotComponent>;
  
  let mockDateService: DateService;
  let mockCpuUsageService: CpuUsageService;
  let mockDateReturn: BehaviorSubject<number>;
  let mockCpuUsageReturn: BehaviorSubject<number>;

  beforeEach(async () => {
    mockDateReturn = new BehaviorSubject<number>(0);
    mockCpuUsageReturn = new BehaviorSubject<number>(0);

    mockDateService = jasmine.createSpyObj('DateService', {
      getNow: mockDateReturn.asObservable()
    }) as DateService;
    
    mockCpuUsageService = jasmine.createSpyObj('CpuUsageService', {
      getCpuUsage: mockCpuUsageReturn.asObservable()
    }) as CpuUsageService;
        
    await TestBed.configureTestingModule({
      declarations: [ CpuHotComponent ],
      providers: [
        { provide: DateService, useValue: mockDateService },
        { provide: CpuUsageService, useValue: mockCpuUsageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
