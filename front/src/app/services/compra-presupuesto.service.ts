import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CompraPresupuestoService {

  
  constructor(private http: HttpClient, private toastr: ToastrService ) { }

    private apiUrl = 'http://localhost:8080/compra-presupuesto';
    //get all
    getAll(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}`);
    }

    // get by id
    getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          this.toastr.error('Error al obtener el any');
          throw error;
        })
      );
  }

  // create
    create(any: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, any)
      .pipe(
        tap(_ => this.toastr.success('anys creado exitosamente')),
        catchError(error => {
          this.toastr.error('Error al crear el any');
          throw error;
        })
      );
  }

  // update
    update(id: number, any: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, any)
      .pipe(
        tap(_ => this.toastr.success('any actualizado exitosamente')),
        catchError(error => {
          this.toastr.error('Error al actualizar el any');
          throw error;
        })
      );
  }

  // delete
    delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(_ => this.toastr.success('any eliminado exitosamente')),
        catchError(error => {
          this.toastr.error('Error al eliminar el any');
          throw error;
        })
      );
  }
}
