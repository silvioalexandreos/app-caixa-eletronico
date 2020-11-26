import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaeletronicoComponent } from './caixaeletronico.component';

describe('CaixaeletronicoComponent', () => {
  let component: CaixaeletronicoComponent;
  let fixture: ComponentFixture<CaixaeletronicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaixaeletronicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaeletronicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
