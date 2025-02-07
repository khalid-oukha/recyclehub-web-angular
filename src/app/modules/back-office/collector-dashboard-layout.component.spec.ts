import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorDashboardLayoutComponent } from './collector-dashboard-layout.component';

describe('CollectorDashboardLayoutComponent', () => {
  let component: CollectorDashboardLayoutComponent;
  let fixture: ComponentFixture<CollectorDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorDashboardLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
