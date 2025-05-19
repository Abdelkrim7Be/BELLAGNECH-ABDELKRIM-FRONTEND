import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {
  private endpoint = '/clients';

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Get all clients
   * @returns Observable with array of clients
   */
  getAll(): Observable<Client[]> {
    return this.http
      .get<Client[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a client by ID
   * @param id The client ID
   * @returns Observable with client data
   */
  getById(id: number): Observable<Client> {
    return this.http
      .get<Client>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Add a new client
   * @param client The client data to add
   * @returns Observable with the created client
   */
  add(client: Client): Observable<Client> {
    return this.http
      .post<Client>(`${this.apiUrl}${this.endpoint}`, client)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing client
   * @param client The client data to update
   * @returns Observable with the updated client
   */
  update(client: Client): Observable<Client> {
    return this.http
      .put<Client>(`${this.apiUrl}${this.endpoint}/${client.id}`, client)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a client
   * @param id The client ID to delete
   * @returns Observable with the operation result
   */
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
