import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualComponent } from './individual.component';

describe('IndividualComponent', () => {
  let component: IndividualComponent;
  let fixture: ComponentFixture<IndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualComponent]
    });
    fixture = TestBed.createComponent(IndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
