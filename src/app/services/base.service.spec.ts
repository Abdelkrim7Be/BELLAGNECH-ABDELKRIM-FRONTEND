import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle client-side errors', () => {
    // Access the private method using type assertion
    const handleError = (service as any).handleError.bind(service);
    
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Network error occurred'
    });
    const errorResponse = new HttpErrorResponse({
      error: errorEvent,
      status: 0,
      statusText: 'Network Error'
    });

    handleError(errorResponse).subscribe({
      error: (error: Error) => {
        expect(error.message).toContain('Network error occurred');
      }
    });
  });

  it('should handle server-side errors', () => {
    // Access the private method using type assertion
    const handleError = (service as any).handleError.bind(service);
    
    const errorResponse = new HttpErrorResponse({
      error: 'Server error',
      status: 500,
      statusText: 'Internal Server Error'
    });

    handleError(errorResponse).subscribe({
      error: (error: Error) => {
        expect(error.message).toContain('Error Code: 500');
      }
    });
  });
});
