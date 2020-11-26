/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransacaoService } from './transacao.service';

describe('Service: Transacao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransacaoService]
    });
  });

  it('should ...', inject([TransacaoService], (service: TransacaoService) => {
    expect(service).toBeTruthy();
  }));
});
