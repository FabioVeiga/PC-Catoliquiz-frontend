import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHomeComponent } from './layout-home.component';

describe('AppHomeComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppHomeComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppHomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
