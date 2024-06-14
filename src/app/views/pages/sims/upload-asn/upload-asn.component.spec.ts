import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAsnComponent } from './upload-asn.component';

describe('UploadAsnComponent', () => {
  let component: UploadAsnComponent;
  let fixture: ComponentFixture<UploadAsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAsnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
