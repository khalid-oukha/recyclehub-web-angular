import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WasteType} from "../../../../models/WasteType";
import {RequestStatus} from "../../../../models/RequestStatus";
import {CollectionRequest} from "../../../../models/DemandeCollecte";
import {CollectionRequestService} from "../../../../core/services/collection-request.service";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-form-collection-request',
  templateUrl: './form-collection-request.component.html',
  styleUrl: './form-collection-request.component.scss'
})
export class FormCollectionRequestComponent implements OnInit {
  currentUser: User | null = null;
  requestForm!: FormGroup;
  wasteTypeValues = Object.values(WasteType);
  wasteTypeLabels: { [key in WasteType]: string } = {
    [WasteType.PLASTIC]: 'PLASTIC',
    [WasteType.GLASS]: 'GLASS',
    [WasteType.PAPER]: 'PAPER',
    [WasteType.METAL]: 'METAL'
  };
  timeSlots = ['09:00 - 12:00', '12:00 - 15:00', '15:00 - 18:00'];
  selectedFiles: File[] = [];
  maxWeight = 10000;
  maxRequests = 3;
  currentRequestsCount: number = 0;

  constructor(private fb: FormBuilder, private collectionRequestService: CollectionRequestService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchCurrentRequestsCount();

    this.authService.getUserDetails().subscribe(user => {
      this.currentUser = user;
    });

    this.requestForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      estimatedWeight: [null, [Validators.required, Validators.min(1000), Validators.max(this.maxWeight)]],
      address: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTimeSlot: ['', Validators.required],
      additionalNotes: [''],
      photos: [[]],
    });
  }

  fetchCurrentRequestsCount() {
    this.collectionRequestService.getAll().subscribe(requests => {
      this.currentRequestsCount = requests.filter(req => req.status === RequestStatus.PENDING /* Or your status */).length;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      if (this.currentRequestsCount >= this.maxRequests) {
        alert("You have reached the maximum number of allowed requests.");
        return;
      }

      const request: CollectionRequest = {
        userId: this.currentUser?.id ?? 0,
        wasteTypes: this.requestForm.value.wasteTypes,
        photos: this.selectedFiles.map(file => file.name),
        estimatedWeight: this.requestForm.value.estimatedWeight,
        address: this.requestForm.value.address,
        preferredDate: this.requestForm.value.preferredDate,
        preferredTimeSlot: this.requestForm.value.preferredTimeSlot,
        additionalNotes: this.requestForm.value.additionalNotes || '',
        status: RequestStatus.PENDING
      };

      this.collectionRequestService.create(request).subscribe({
        next: (createdRequest) => {
          this.requestForm.reset();
          this.selectedFiles = [];
          this.fetchCurrentRequestsCount();
        },
        error: (error) => {
          alert('There was an error processing your request. Please try again.');
        }
      });
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

}
