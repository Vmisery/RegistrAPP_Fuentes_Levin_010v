import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfildocentePage } from './perfildocente.page';

describe('PerfildocentePage', () => {
  let component: PerfildocentePage;
  let fixture: ComponentFixture<PerfildocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerfildocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
