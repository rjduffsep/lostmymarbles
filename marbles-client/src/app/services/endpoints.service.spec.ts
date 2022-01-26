import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EndpointsService } from './endpoints.service';

describe('EndpointsService', () => {
  let service: EndpointsService; 
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', {
      get: of()
    }) as HttpClient;
    TestBed.configureTestingModule({providers: [
      { provide: HttpClient, useValue: mockHttpClient }
    ]});
    service = TestBed.inject(EndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
