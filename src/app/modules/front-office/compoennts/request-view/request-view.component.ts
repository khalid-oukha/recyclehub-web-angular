import {Component, OnInit} from '@angular/core';
import {CollectionRequest} from "../../../../models/DemandeCollecte";
import {CollectionRequestService} from "../../../../core/services/collection-request.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class RequestViewComponent implements OnInit {
  collectionRequests: CollectionRequest[] = [];

  constructor(
    private collectionRequestService: CollectionRequestService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loadUserRequests();
  }

  loadUserRequests(): void {
    this.authService.getUserDetails().subscribe(user => {
      if (user && user.id) {
        this.collectionRequestService.getByUserId(user.id).subscribe(requests => {
          this.collectionRequests = requests;
        });
      }
    });
  }

  getTotalWeight(wasteItems: any[]): number {
    return wasteItems.reduce((total, item) => total + item.weight, 0);
  }

  onEdit(id: string): void {
    console.log('Edit request for ID:', id);
  }

  onDelete(id: string): void {
    console.log('Delete request for ID:', id);
  }
}
