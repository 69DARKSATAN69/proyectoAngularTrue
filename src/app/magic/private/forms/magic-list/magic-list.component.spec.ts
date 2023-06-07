import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicListComponent } from './magic-list.component';

describe('MagicListComponent', () => {
  let component: MagicListComponent;
  let fixture: ComponentFixture<MagicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicListComponent]
    });
    fixture = TestBed.createComponent(MagicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
