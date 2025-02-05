import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CollectionRequest} from "../../models/DemandeCollecte";

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:3000/collectionRequests';


  getAll(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl);
  }

  getById(id: string): Observable<CollectionRequest> {
    return this.http.get<CollectionRequest>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: Number): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}/${userId}`);
  }

  create(CollectionRequest: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.apiUrl, CollectionRequest);
  }

  updateRequest(id: string, request: Partial<CollectionRequest>): Observable<CollectionRequest> {
    return this.http.patch<CollectionRequest>(`${this.apiUrl}/${id}`, request);
  }

  deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
