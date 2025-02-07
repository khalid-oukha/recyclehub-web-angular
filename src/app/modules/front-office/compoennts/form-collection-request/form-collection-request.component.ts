import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  maxTotalWeight = 10;
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
      wasteItems: this.fb.array([]),
      address: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTimeSlot: ['', Validators.required],
      additionalNotes: [''],
      photos: [[]]
    });
  }

  get wasteItemsControls() {
    return (this.requestForm.get('wasteItems') as FormArray).controls;
  }

  addWasteItem(): void {
    const wasteItemForm = this.fb.group({
      type: ['', Validators.required],
      weight: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.maxTotalWeight)
      ]]
    });

    (this.requestForm.get('wasteItems') as FormArray).push(wasteItemForm);
  }

  removeWasteItem(index: number): void {
    (this.requestForm.get('wasteItems') as FormArray).removeAt(index);
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
    if (this.requestForm.valid && this.validateTotalWeight() && this.currentPendingRequestsCount < this.maxRequests) {
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

  private validateTotalWeight(): boolean {
    const wasteItems = this.requestForm.get('wasteItems') as FormArray;
    const totalWeight = wasteItems.controls.reduce(
      (sum, control) => sum + (control.get('weight')?.value || 0), 0
    );
    return totalWeight > 0 && totalWeight <= this.maxTotalWeight;
  }

  private createRequest(): CollectionRequest {
    const wasteItems = (this.requestForm.get('wasteItems') as FormArray).controls.map(control => ({
      type: control.get('type')?.value ?? '',
      weight: control.get('weight')?.value ?? 0,
      points: this.calculatePoints(
        control.get('type')?.value ?? '',
        control.get('weight')?.value ?? 0
      )
    }));

    return {
      userId: this.currentUser?.id ?? '',
      wasteItems,
      photos: this.selectedFiles.map((file) => file.name),
      address: this.requestForm.value.address,
      preferredDate: this.requestForm.value.preferredDate,
      preferredTimeSlot: this.requestForm.value.preferredTimeSlot,
      additionalNotes: this.requestForm.value.additionalNotes || '',
      status: RequestStatus.PENDING
    };
  }

  private calculatePoints(type: WasteType, weight: number): number {
    const pointsMap = {
      [WasteType.PLASTIC]: 2,
      [WasteType.GLASS]: 1,
      [WasteType.PAPER]: 1,
      [WasteType.METAL]: 5
    };
    return Math.round(weight * pointsMap[type]);
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
