import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosServiceService {
  
  constructor(private http: HttpClient, private toastr: ToastrService ) { }

  private apiUrl = 'http://localhost:8080/empleados';
  //get all
  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Empleado> {
  return this.http.get<Empleado>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al obtener el Empleado');
        throw error;
      })
    );
}

// create
  create(Empleado: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Empleado)
    .pipe(
      tap(_ => this.toastr.success('Empleados creado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al crear el Empleado');
        throw error;
      })
    );
}

// update
  update(id: number, Empleado: FormData): Observable<Empleado> {
  return this.http.put<Empleado>(`${this.apiUrl}/${id}`, Empleado)
    .pipe(
      tap(_ => this.toastr.success('Empleado actualizado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al actualizar el Empleado');
        throw error;
      })
    );
}

// delete
  delete(id: number): Observable<Empleado> {
  return this.http.delete<Empleado>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(_ => this.toastr.success('Empleado eliminado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al eliminar el Empleado');
        throw error;
      })
    );
}
 
}
