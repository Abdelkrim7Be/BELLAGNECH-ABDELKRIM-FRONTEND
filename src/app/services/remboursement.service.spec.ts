import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RemboursementService } from './remboursement.service';
import { environment } from '../../environments/environment';

describe('RemboursementService', () => {
  let service: RemboursementService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RemboursementService]
    });
    service = TestBed.inject(RemboursementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all remboursements', () => {
    const mockRemboursements = [
      { id: 1, montant: 500, creditId: 1, date: '2025-01-15' },
      { id: 2, montant: 750, creditId: 2, date: '2025-02-15' }
    ];

    service.getAll().subscribe(remboursements => {
      expect(remboursements.length).toBe(2);
      expect(remboursements).toEqual(mockRemboursements);
    });

    const req = httpMock.expectOne(`${apiUrl}/remboursements`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRemboursements);
  });

  it('should get a remboursement by id', () => {
    const mockRemboursement = { id: 1, montant: 500, creditId: 1, date: '2025-01-15' };

    service.getById(1).subscribe(remboursement => {
      expect(remboursement).toEqual(mockRemboursement);
    });

    const req = httpMock.expectOne(`${apiUrl}/remboursements/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRemboursement);
  });

  it('should get remboursements by credit id', () => {
    const mockRemboursements = [
      { id: 1, montant: 500, creditId: 1, date: '2025-01-15' },
      { id: 3, montant: 500, creditId: 1, date: '2025-02-15' }
    ];

    service.getByCreditId(1).subscribe(remboursements => {
      expect(remboursements.length).toBe(2);
      expect(remboursements).toEqual(mockRemboursements);
    });

    const req = httpMock.expectOne(`${apiUrl}/credits/1/remboursements`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRemboursements);
  });

  it('should add a new remboursement', () => {
    const mockRemboursement = { montant: 500, creditId: 1, date: '2025-01-15' };
    const mockResponse = { id: 3, montant: 500, creditId: 1, date: '2025-01-15' };

    service.add(mockRemboursement).subscribe(remboursement => {
      expect(remboursement).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/remboursements`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRemboursement);
    req.flush(mockResponse);
  });

  it('should update a remboursement', () => {
    const mockRemboursement = { id: 1, montant: 600, creditId: 1, date: '2025-01-15' };

    service.update(mockRemboursement).subscribe(remboursement => {
      expect(remboursement).toEqual(mockRemboursement);
    });

    const req = httpMock.expectOne(`${apiUrl}/remboursements/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockRemboursement);
    req.flush(mockRemboursement);
  });

  it('should delete a remboursement', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/remboursements/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
