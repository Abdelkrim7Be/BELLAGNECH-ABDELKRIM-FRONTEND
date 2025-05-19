import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreditService } from './credit.service';
import { environment } from '../../environments/environment';

describe('CreditService', () => {
  let service: CreditService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreditService]
    });
    service = TestBed.inject(CreditService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all credits', () => {
    const mockCredits = [
      { id: 1, montant: 10000, clientId: 1 },
      { id: 2, montant: 20000, clientId: 2 }
    ];

    service.getAll().subscribe(credits => {
      expect(credits.length).toBe(2);
      expect(credits).toEqual(mockCredits);
    });

    const req = httpMock.expectOne(`${apiUrl}/credits`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredits);
  });

  it('should get a credit by id', () => {
    const mockCredit = { id: 1, montant: 10000, clientId: 1 };

    service.getById(1).subscribe(credit => {
      expect(credit).toEqual(mockCredit);
    });

    const req = httpMock.expectOne(`${apiUrl}/credits/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredit);
  });

  it('should get credits by client id', () => {
    const mockCredits = [
      { id: 1, montant: 10000, clientId: 1 },
      { id: 3, montant: 15000, clientId: 1 }
    ];

    service.getByClientId(1).subscribe(credits => {
      expect(credits.length).toBe(2);
      expect(credits).toEqual(mockCredits);
    });

    const req = httpMock.expectOne(`${apiUrl}/clients/1/credits`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredits);
  });

  it('should add a new credit', () => {
    const mockCredit = { montant: 10000, clientId: 1 };
    const mockResponse = { id: 3, montant: 10000, clientId: 1 };

    service.add(mockCredit).subscribe(credit => {
      expect(credit).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/credits`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredit);
    req.flush(mockResponse);
  });

  it('should update a credit', () => {
    const mockCredit = { id: 1, montant: 15000, clientId: 1 };

    service.update(mockCredit).subscribe(credit => {
      expect(credit).toEqual(mockCredit);
    });

    const req = httpMock.expectOne(`${apiUrl}/credits/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCredit);
    req.flush(mockCredit);
  });

  it('should delete a credit', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/credits/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
