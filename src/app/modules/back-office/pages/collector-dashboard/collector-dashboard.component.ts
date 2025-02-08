import { Component, OnInit } from '@angular/core';
import { CollectionRequest } from "../../../../models/DemandeCollecte";
import { CollectionRequestService } from "../../../../core/services/collection-request.service";
import { RequestStatus } from "../../../../models/RequestStatus";
import { switchMap } from "rxjs";
import { UserService } from "../../../../core/services/user.service";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrls: ['./collector-dashboard.component.scss']
})
export class CollectorDashboardComponent implements OnInit {
  collectionRequests: CollectionRequest[] = [];
  filteredRequests: CollectionRequest[] = [];
  selectedStatus: string = '';
  currentUserCity: string = '';

  constructor(
    private collectionRequestService: CollectionRequestService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.address) {
        this.currentUserCity = user.address.city;
        this.fetchRequests();
      } else {
        console.error('User address is missing.');
      }
    });
  }

  fetchRequests(): void {
    this.collectionRequestService.getAll().subscribe((requests) => {
      this.collectionRequests = requests.filter(
        (request) => request.address?.city?.trim().toLowerCase() === this.currentUserCity.trim().toLowerCase()
      );
      this.filteredRequests = [...this.collectionRequests];
    });
  }

  filterByStatus(): void {
    if (this.selectedStatus) {
      this.filteredRequests = this.collectionRequests.filter(
        (request) => request.status === this.selectedStatus
      );
    } else {
      this.filteredRequests = [...this.collectionRequests];
    }
  }

  isPending(request: CollectionRequest): boolean {
    return request.status === RequestStatus.PENDING;
  }

  onAccept(requestId: string | undefined) {
    if (!requestId) return;

    const request = this.collectionRequests.find((r) => r.id === requestId);
    if (!request || !this.isPending(request)) return;

    const totalPoints = request.wasteItems.reduce((sum, item) => sum + (item.points || 0), 0);

    this.collectionRequestService
      .updateRequest(requestId, {
        status: RequestStatus.ACCEPTED,
        totalPoints: totalPoints,
      })
      .pipe(
        switchMap((updatedRequest) => this.userService.getUserById(updatedRequest.userId)),
        switchMap((user) =>
          this.userService.updateUser(user.id, { totalPoints: (user.totalPoints || 0) + totalPoints })
        )
      )
      .subscribe(() => {
        const index = this.collectionRequests.findIndex((r) => r.id === requestId);
        if (index > -1) {
          this.collectionRequests[index].status = RequestStatus.ACCEPTED;
          this.filterByStatus();
        }
      });
  }

  onReject(requestId: string | undefined) {
    if (!requestId) return;

    const request = this.collectionRequests.find((r) => r.id === requestId);
    if (!request || !this.isPending(request)) return;

    this.collectionRequestService
      .updateRequest(requestId, { status: RequestStatus.REJECTED })
      .subscribe((updatedRequest) => {
        const index = this.collectionRequests.findIndex((r) => r.id === updatedRequest.id);
        if (index > -1) {
          this.collectionRequests[index] = updatedRequest;
          this.filterByStatus();
        }
      });
  }

  getTotalWeight(wasteItems: any[]): number {
    return wasteItems.reduce((total, item) => total + item.weight, 0);
  }

  onEdit(id: string) {
    return null;
  }

  onDelete(id: string) {
    return null;
  }
}
