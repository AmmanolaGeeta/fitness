import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaterPage } from './water.page';

describe('WaterPage', () => {
  let component: WaterPage;
  let fixture: ComponentFixture<WaterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
