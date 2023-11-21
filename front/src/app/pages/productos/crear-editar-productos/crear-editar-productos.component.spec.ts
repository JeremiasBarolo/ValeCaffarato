import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarProductosComponent } from './crear-editar-productos.component';

describe('CrearEditarProductosComponent', () => {
  let component: CrearEditarProductosComponent;
  let fixture: ComponentFixture<CrearEditarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEditarProductosComponent]
    });
    fixture = TestBed.createComponent(CrearEditarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
