import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollectionRequest} from '../../../../models/DemandeCollecte';
import {CollectionRequestService} from '../../../../core/services/collection-request.service';
import {AuthService} from '../../../../core/services/auth.service';
import {RequestStatus} from '../../../../models/RequestStatus';
import {User} from '../../../../models/User';
import {WasteType} from '../../../../models/WasteType';

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
  currentRequests: CollectionRequest[] = [];
  currentPendingRequestsCount = 0;

  constructor(
    private fb: FormBuilder,
    private collectionRequestService: CollectionRequestService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.fetchCurrentRequests();
        this.fetchPendingRequestsCount();
      }
    });
  }

  private initializeForm(): void {
    this.requestForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      estimatedWeight: [null, [Validators.required, Validators.min(1000), Validators.max(this.maxWeight)]],
      address: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTimeSlot: ['', Validators.required],
      additionalNotes: [''],
      photos: [[]]
    });
  }

  private fetchCurrentRequests(): void {
    if (this.currentUser) {
      this.collectionRequestService.getByUserId(this.currentUser.id).subscribe((requests) => {
        this.currentRequests = requests;
      });
    }
  }

  private fetchPendingRequestsCount(): void {
    if (this.currentUser) {
      this.collectionRequestService
        .getByUserIdAndStatus(this.currentUser.id, RequestStatus.PENDING)
        .subscribe((requests) => {
          this.currentPendingRequestsCount = requests.length;
        });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.requestForm.valid && this.currentPendingRequestsCount < this.maxRequests) {
      const newRequest: CollectionRequest = this.createRequest();
      this.collectionRequestService.create(newRequest).subscribe({
        next: () => this.handleRequestSuccess(),
        error: () => this.handleRequestError()
      });
    } else if (this.currentPendingRequestsCount >= this.maxRequests) {
      alert('You have reached the maximum number of allowed requests.');
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

  private createRequest(): CollectionRequest {
    return {
      userId: this.currentUser?.id ?? 0,
      wasteTypes: this.requestForm.value.wasteTypes,
      photos: this.selectedFiles.map((file) => file.name),
      estimatedWeight: this.requestForm.value.estimatedWeight,
      address: this.requestForm.value.address,
      preferredDate: this.requestForm.value.preferredDate,
      preferredTimeSlot: this.requestForm.value.preferredTimeSlot,
      additionalNotes: this.requestForm.value.additionalNotes || '',
      status: RequestStatus.PENDING
    };
  }

  private handleRequestSuccess(): void {
    console.log('Request created successfully');
    this.requestForm.reset();
    this.selectedFiles = [];
    this.fetchCurrentRequests();
    this.fetchPendingRequestsCount();
  }

  private handleRequestError(): void {
    alert('There was an error processing your request. Please try again.');
  }
}
