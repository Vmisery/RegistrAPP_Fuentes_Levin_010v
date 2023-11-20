import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeploycameraPage } from './deploycamera.page';

describe('DeploycameraPage', () => {
  let component: DeploycameraPage;
  let fixture: ComponentFixture<DeploycameraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeploycameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
