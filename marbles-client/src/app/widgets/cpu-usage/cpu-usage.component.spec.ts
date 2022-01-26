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
});
