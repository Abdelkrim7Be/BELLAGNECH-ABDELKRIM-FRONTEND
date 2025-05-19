import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Remboursement } from '../models/remboursement.model';

@Injectable({
  providedIn: 'root',
})
export class RemboursementService extends BaseService {
  private endpoint = '/remboursements';

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Get all remboursements
   * @returns Observable with array of remboursements
   */
  getAll(): Observable<Remboursement[]> {
    return this.http
      .get<Remboursement[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a remboursement by ID
   * @param id The remboursement ID
   * @returns Observable with remboursement data
   */
  getById(id: number): Observable<Remboursement> {
    return this.http
      .get<Remboursement>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get remboursements by credit ID
   * @param creditId The credit ID
   * @returns Observable with array of remboursements for the credit
   */
  getByCreditId(creditId: number): Observable<Remboursement[]> {
    return this.http
      .get<Remboursement[]>(`${this.apiUrl}/credits/${creditId}/remboursements`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Add a new remboursement
   * @param remboursement The remboursement data to add
   * @returns Observable with the created remboursement
   */
  add(remboursement: Remboursement): Observable<Remboursement> {
    return this.http
      .post<Remboursement>(`${this.apiUrl}${this.endpoint}`, remboursement)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing remboursement
   * @param remboursement The remboursement data to update
   * @returns Observable with the updated remboursement
   */
  update(remboursement: Remboursement): Observable<Remboursement> {
    return this.http
      .put<Remboursement>(
        `${this.apiUrl}${this.endpoint}/${remboursement.id}`,
        remboursement
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a remboursement
   * @param id The remboursement ID to delete
   * @returns Observable with the operation result
   */
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
