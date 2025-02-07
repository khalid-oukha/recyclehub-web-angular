import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorHeaderComponent } from './collector-header.component';

describe('CollectorHeaderComponent', () => {
  let component: CollectorHeaderComponent;
  let fixture: ComponentFixture<CollectorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
