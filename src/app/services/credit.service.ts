import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseService } from './base.service';

// We'll define the Credit interface later, for now using any
interface Credit {
  id?: number;
  clientId?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CreditService extends BaseService {
  private endpoint = '/credits';

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Get all credits
   * @returns Observable with array of credits
   */
  getAll(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get a credit by ID
   * @param id The credit ID
   * @returns Observable with credit data
   */
  getById(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get credits by client ID
   * @param clientId The client ID
   * @returns Observable with array of credits for the client
   */
  getByClientId(clientId: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/clients/${clientId}/credits`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Add a new credit
   * @param credit The credit data to add
   * @returns Observable with the created credit
   */
  add(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(`${this.apiUrl}${this.endpoint}`, credit)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing credit
   * @param credit The credit data to update
   * @returns Observable with the updated credit
   */
  update(credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}${this.endpoint}/${credit.id}`, credit)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a credit
   * @param id The credit ID to delete
   * @returns Observable with the operation result
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
