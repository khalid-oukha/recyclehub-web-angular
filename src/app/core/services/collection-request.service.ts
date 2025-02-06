import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CollectionRequest} from "../../models/DemandeCollecte";

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  private apiUrl = '/collectionRequests';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl);
  }

  getById(id: string): Observable<CollectionRequest> {
    return this.http.get<CollectionRequest>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getByUserIdAndStatus(userId: number, status: string): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}?userId=${userId}&status=${status}`);
  }

  create(request: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.apiUrl, request);
  }

  updateRequest(id: string, request: Partial<CollectionRequest>): Observable<CollectionRequest> {
    return this.http.patch<CollectionRequest>(`${this.apiUrl}/${id}`, request);
  }

  deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
