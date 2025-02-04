import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCollectionRequestComponent } from './form-collection-request.component';

describe('FormCollectionRequestComponent', () => {
  let component: FormCollectionRequestComponent;
  let fixture: ComponentFixture<FormCollectionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCollectionRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCollectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
