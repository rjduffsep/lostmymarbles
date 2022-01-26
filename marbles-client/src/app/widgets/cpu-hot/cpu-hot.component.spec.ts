import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuHotComponent } from './cpu-hot.component';

describe('CpuHotComponent', () => {
  let component: CpuHotComponent;
  let fixture: ComponentFixture<CpuHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuHotComponent ]
    })
    .compileComponents();
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
