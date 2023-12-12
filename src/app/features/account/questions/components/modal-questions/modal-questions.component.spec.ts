import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuestionsComponent } from './modal-questions.component';

describe('ModalQuestionsComponent', () => {
  let component: ModalQuestionsComponent;
  let fixture: ComponentFixture<ModalQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
