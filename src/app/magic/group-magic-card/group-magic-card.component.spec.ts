import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMagicCardComponent } from './group-magic-card.component';

describe('GroupMagicCardComponent', () => {
  let component: GroupMagicCardComponent;
  let fixture: ComponentFixture<GroupMagicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupMagicCardComponent]
    });
    fixture = TestBed.createComponent(GroupMagicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
