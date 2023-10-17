import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductEntity } from '../models/product-entity';
@Injectable({
  providedIn: 'root'
})
export class ProductEntityService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

    private apiUrl = 'http://localhost:8080/product_entity';
    //get all
    getAll(): Observable<ProductEntity[]> {
      return this.http.get<ProductEntity[]>(`${this.apiUrl}`);
    }

    // get by id
    getById(id: number): Observable<ProductEntity> {
    return this.http.get<ProductEntity>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          this.toastr.error('Error al obtener el ProductEntity');
          throw error;
        })
      );
  }

  // create
    create(ProductEntity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, ProductEntity)
      .pipe(
        tap(_ => this.toastr.success('Entidad creada exitosamente')),
        catchError(error => {
          this.toastr.error('Error al crear el ProductEntity');
          throw error;
        })
      );
  }

  // update
    update(id: number, ProductEntity: FormData): Observable<ProductEntity> {
    return this.http.put<ProductEntity>(`${this.apiUrl}/${id}`, ProductEntity)
      .pipe(
        tap(_ => this.toastr.success('Entidad actualizado exitosamente')),
        catchError(error => {
          this.toastr.error('Error al actualizar el ProductEntity');
          throw error;
        })
      );
  }

  // delete
    delete(id: number): Observable<ProductEntity> {
    return this.http.delete<ProductEntity>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(_ => this.toastr.success('Entidad eliminado exitosamente')),
        catchError(error => {
          this.toastr.error('Error al eliminar el ProductEntity');
          throw error;
        })
      );
  }
}
