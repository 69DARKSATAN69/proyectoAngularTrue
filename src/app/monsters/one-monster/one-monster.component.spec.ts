import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMonsterComponent } from './one-monster.component';

describe('OneMonsterComponent', () => {
  let component: OneMonsterComponent;
  let fixture: ComponentFixture<OneMonsterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneMonsterComponent]
    });
    fixture = TestBed.createComponent(OneMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
