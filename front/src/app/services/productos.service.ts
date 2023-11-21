import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductEntity } from '../models/product-entity';
import { AppSettings } from 'appsettings-json-reader';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/productos`;
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
      
  }

  // update
    update(id: number, ProductEntity: FormData): Observable<ProductEntity> {
    return this.http.put<ProductEntity>(`${this.apiUrl}/${id}`, ProductEntity)
      
  }

  // delete
    delete(id: number): Observable<ProductEntity> {
    return this.http.delete<ProductEntity>(`${this.apiUrl}/${id}`)
      
  }

}
