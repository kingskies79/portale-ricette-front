import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewDeleteComponent } from './dialog-overview-delete.component';

describe('DialogOverviewDeleteComponent', () => {
  let component: DialogOverviewDeleteComponent;
  let fixture: ComponentFixture<DialogOverviewDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogOverviewDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOverviewDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
