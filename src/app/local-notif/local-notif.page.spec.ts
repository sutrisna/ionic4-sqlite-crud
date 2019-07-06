import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalNotifPage } from './local-notif.page';

describe('LocalNotifPage', () => {
  let component: LocalNotifPage;
  let fixture: ComponentFixture<LocalNotifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalNotifPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalNotifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
