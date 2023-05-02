import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpdateComponent } from './products-update.component';

describe('ProductsUpdateComponent', () => {
  let component: ProductsUpdateComponent;
  let fixture: ComponentFixture<ProductsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
