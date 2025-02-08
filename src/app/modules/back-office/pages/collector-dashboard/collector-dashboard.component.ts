import {Component, OnInit} from '@angular/core';
import {CollectionRequest} from "../../../../models/DemandeCollecte";
import {CollectionRequestService} from "../../../../core/services/collection-request.service";
import {RequestStatus} from "../../../../models/RequestStatus";
import {switchMap} from "rxjs";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.scss'
})
export class CollectorDashboardComponent implements OnInit {
  collectionRequests: CollectionRequest[] = [];
  filteredRequests: CollectionRequest[] = [];
  selectedStatus: string = '';

  constructor(
    private collectionRequestService: CollectionRequestService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.collectionRequestService.getAll().subscribe((requests) => {
      this.collectionRequests = requests;
      this.filteredRequests = [...requests];
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

  onAccept(requestId: string | undefined) {
    if (!requestId) return;

    const request = this.collectionRequests.find((r) => r.id === requestId);
    if (!request) return;

    const totalPoints = request.wasteItems.reduce((sum, item) => sum + (item.points || 0), 0);

    this.collectionRequestService
      .updateRequest(requestId, {
        status: RequestStatus.ACCEPTED,
        totalPoints: totalPoints,
      })
      .pipe(
        switchMap((updatedRequest) => this.userService.getUserById(updatedRequest.userId)),
        switchMap((user) =>
          this.userService.updateUser(user.id, {totalPoints: (user.totalPoints || 0) + totalPoints})
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
    if (!request) return;

    this.collectionRequestService
      .updateRequest(requestId, {status: RequestStatus.REJECTED})
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
