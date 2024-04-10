import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'appsettings-json-reader';


@Injectable({
  providedIn: 'root'
})
export class ProductosEnStockService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/productos_en_stock`;
    getAll(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}`);
    }

    // get by id
    getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          this.toastr.error('Error al obtener el Entidad');
          throw error;
        })
      );
  }

  // create
    create(ProductEntity: any): Observable<any> {
      
      
    return this.http.post<any>(`${this.apiUrl}`, ProductEntity)
      
  }

  // update
    update(id: number, ProductEntity: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ProductEntity)
      
  }

  // delete
    delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      
  }

}
