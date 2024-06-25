import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaRicetteComponent } from './cerca-ricette.component';

describe('CercaRicetteComponent', () => {
  let component: CercaRicetteComponent;
  let fixture: ComponentFixture<CercaRicetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CercaRicetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CercaRicetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
