import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilestudiantePage } from './perfilestudiante.page';

describe('PerfilestudiantePage', () => {
  let component: PerfilestudiantePage;
  let fixture: ComponentFixture<PerfilestudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerfilestudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
