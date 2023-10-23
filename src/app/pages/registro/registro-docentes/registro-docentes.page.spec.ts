import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDocentesPage } from './registro-docentes.page';

describe('RegistroDocentesPage', () => {
  let component: RegistroDocentesPage;
  let fixture: ComponentFixture<RegistroDocentesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroDocentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
