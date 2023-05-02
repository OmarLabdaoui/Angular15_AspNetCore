import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDetailsComponent } from './fruit-details.component';

describe('FruitDetailsComponent', () => {
  let component: FruitDetailsComponent;
  let fixture: ComponentFixture<FruitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
