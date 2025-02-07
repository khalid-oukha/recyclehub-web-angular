import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorSideBarComponent } from './collector-side-bar.component';

describe('CollectorSideBarComponent', () => {
  let component: CollectorSideBarComponent;
  let fixture: ComponentFixture<CollectorSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
