import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MieRicetteComponent } from './mie-ricette.component';

describe('MieRicetteComponent', () => {
  let component: MieRicetteComponent;
  let fixture: ComponentFixture<MieRicetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MieRicetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MieRicetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
