import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidCodComponent } from './valid-cod.component';

describe('ValidCodComponent', () => {
  let component: ValidCodComponent;
  let fixture: ComponentFixture<ValidCodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidCodComponent]
    });
    fixture = TestBed.createComponent(ValidCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
