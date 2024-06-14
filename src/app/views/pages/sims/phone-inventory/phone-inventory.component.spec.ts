import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneInventoryComponent } from './phone-inventory.component';

describe('PhoneInventoryComponent', () => {
  let component: PhoneInventoryComponent;
  let fixture: ComponentFixture<PhoneInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
