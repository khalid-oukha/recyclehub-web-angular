import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-collection-request',
  templateUrl: './form-collection-request.component.html',
  styleUrl: './form-collection-request.component.scss'
})
export class FormCollectionRequestComponent implements OnInit {
  requestForm!: FormGroup;
  wasteTypes = ['Plastique', 'Verre', 'Papier', 'Métal'];
  timeSlots = ['09:00 - 12:00', '12:00 - 15:00', '15:00 - 18:00'];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      estimatedWeight: [null, [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTimeSlot: ['', Validators.required],
      additionalNotes: [''],
      photos: [''],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      console.log('Form submitted:', this.requestForm.value);
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}
