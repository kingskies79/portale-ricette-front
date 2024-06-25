import { TestBed } from '@angular/core/testing';

import { ListaDellaSpesaService } from './lista-della-spesa.service';

describe('ListaDellaSpesaService', () => {
  let service: ListaDellaSpesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDellaSpesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
