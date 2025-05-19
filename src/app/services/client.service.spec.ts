import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { environment } from '../../environments/environment';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all clients', () => {
    const mockClients = [
      { id: 1, nom: 'Client 1' },
      { id: 2, nom: 'Client 2' }
    ];

    service.getAll().subscribe(clients => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(`${apiUrl}/clients`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('should get a client by id', () => {
    const mockClient = { id: 1, nom: 'Client 1' };

    service.getById(1).subscribe(client => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`${apiUrl}/clients/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should add a new client', () => {
    const mockClient = { nom: 'New Client' };
    const mockResponse = { id: 3, nom: 'New Client' };

    service.add(mockClient).subscribe(client => {
      expect(client).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/clients`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockClient);
    req.flush(mockResponse);
  });

  it('should update a client', () => {
    const mockClient = { id: 1, nom: 'Updated Client' };

    service.update(mockClient).subscribe(client => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`${apiUrl}/clients/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockClient);
    req.flush(mockClient);
  });

  it('should delete a client', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/clients/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
