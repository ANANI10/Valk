import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreCategorieComponent } from './nombre-categorie.component';

describe('NombreCategorieComponent', () => {
  let component: NombreCategorieComponent;
  let fixture: ComponentFixture<NombreCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NombreCategorieComponent]
    });
    fixture = TestBed.createComponent(NombreCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
