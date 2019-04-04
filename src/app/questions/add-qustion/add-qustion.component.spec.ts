import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQustionComponent } from './add-qustion.component';

describe('AddQustionComponent', () => {
  let component: AddQustionComponent;
  let fixture: ComponentFixture<AddQustionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQustionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQustionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
