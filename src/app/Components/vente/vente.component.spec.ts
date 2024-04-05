import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteComponent } from './vente.component';

describe('VenteComponent', () => {
  let component: VenteComponent;
  let fixture: ComponentFixture<VenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteComponent]
    });
    fixture = TestBed.createComponent(VenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
