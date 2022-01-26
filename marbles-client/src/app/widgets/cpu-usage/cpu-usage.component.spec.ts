import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { CpuUsageService } from 'src/app/services/cpu-usage.service';

import { CpuUsageComponent } from './cpu-usage.component';

describe('CpuUsageComponent', () => {
  let component: CpuUsageComponent;
  let fixture: ComponentFixture<CpuUsageComponent>;
  
  let mockCpuUsageService: CpuUsageService;
  let mockCpuUsageReturn: BehaviorSubject<number>;

  beforeEach(async () => {
    mockCpuUsageReturn = new BehaviorSubject<number>(0);
    
    mockCpuUsageService = jasmine.createSpyObj('CpuUsageService', {
      getCpuUsage: mockCpuUsageReturn.asObservable()
    }) as CpuUsageService;

    await TestBed.configureTestingModule({
      declarations: [ CpuUsageComponent ],
      providers: [
        { provide: CpuUsageService, useValue: mockCpuUsageService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render usage of 0 initially', () => {    
    component.cpuUsage.subscribe((cpuUsage) => expect(cpuUsage).toEqual(0));
  });

  it('should render current usage', () => {
    const newCpuUsage = 1.23;
    mockCpuUsageReturn.next(newCpuUsage);
    component.cpuUsage.subscribe((cpuUsage) => expect(cpuUsage).toEqual(newCpuUsage));
  });
});
