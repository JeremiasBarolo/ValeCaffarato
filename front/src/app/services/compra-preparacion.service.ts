import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class CompraPreparacionService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

    private apiUrl = 'http://localhost:8080/compra-preparacion';
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
        catchError(error => {
          this.toastr.error('Error al eliminar el any');
          throw error;
        })
      );
  }
 
}
