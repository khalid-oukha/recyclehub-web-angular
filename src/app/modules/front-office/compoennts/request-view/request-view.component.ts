import {Component, OnInit} from '@angular/core';
import {CollectionRequest} from "../../../../models/DemandeCollecte";
import {CollectionRequestService} from "../../../../core/services/collection-request.service";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../models/User";
import {selectCurrentUser} from "../../../../store/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.state";

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class RequestViewComponent implements OnInit {
  collectionRequests: CollectionRequest[] = [];
  currentUser: User | null = null;
  user$ = this.store.select(selectCurrentUser);
  constructor(
    private collectionRequestService: CollectionRequestService,
    private authService: AuthService,
    private store:Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.loadUserRequests();


  }



  loadUserRequests(): void {
    this.user$.subscribe(user => {
      this.currentUser=user;
    })

    if (this.currentUser) {
      this.collectionRequestService.getByUserId(this.currentUser.id).subscribe(requests => {
        this.collectionRequests = requests;
      })
    }

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
