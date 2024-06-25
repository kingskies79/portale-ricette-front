import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSpesaComponent } from './lista-spesa.component';

describe('ListaSpesaComponent', () => {
  let component: ListaSpesaComponent;
  let fixture: ComponentFixture<ListaSpesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaSpesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
