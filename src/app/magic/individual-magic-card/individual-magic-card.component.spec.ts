import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMagicCardComponent } from './individual-magic-card.component';

describe('IndividualMagicCardComponent', () => {
  let component: IndividualMagicCardComponent;
  let fixture: ComponentFixture<IndividualMagicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualMagicCardComponent]
    });
    fixture = TestBed.createComponent(IndividualMagicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
