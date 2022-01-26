import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { DateService } from 'src/app/services/date.service';

import { DateComponent } from './date.component';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;
  let mockDateService: DateService;
  let mockDateReturn: BehaviorSubject<number>;

  beforeEach(async () => {
    mockDateReturn = new BehaviorSubject<number>(0);

    mockDateService = jasmine.createSpyObj('DateService', {
      getNow: mockDateReturn.asObservable()
    }) as DateService;

    await TestBed.configureTestingModule({
      declarations: [ DateComponent ],
      providers: [
        { provide: DateService, useValue: mockDateService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render date of 0 initially', () => {    
    component.now.subscribe((date) => expect(date).toEqual(0));
  });

  it('should render current date', () => {
    const newDate = 123;
    mockDateReturn.next(newDate);
    component.now.subscribe((date) => expect(date).toEqual(newDate));
  });
});
