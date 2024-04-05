import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbreEmployeComponent } from './nbre-employe.component';

describe('NbreEmployeComponent', () => {
  let component: NbreEmployeComponent;
  let fixture: ComponentFixture<NbreEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbreEmployeComponent]
    });
    fixture = TestBed.createComponent(NbreEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
