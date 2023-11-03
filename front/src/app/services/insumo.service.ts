import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Insumo } from '../models/insumo';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

  private apiUrl = 'http://localhost:8080/insumos';
  //get all
  getAll(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Insumo> {
  return this.http.get<Insumo>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al obtener el Insumo');
        throw error;
      })
    );
}

// create
  create(Insumo: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Insumo)
    .pipe(
      tap(_ => this.toastr.success('Entidad creada exitosamente')),
      catchError(error => {
        this.toastr.error('Error al crear el Insumo');
        throw error;
      })
    );
}

// update
  update(id: number, Insumo: FormData): Observable<Insumo> {
  return this.http.put<Insumo>(`${this.apiUrl}/${id}`, Insumo)
    .pipe(
      tap(_ => this.toastr.success('Entidad actualizado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al actualizar el Insumo');
        throw error;
      })
    );
}

// delete
  delete(id: number): Observable<Insumo> {
  return this.http.delete<Insumo>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(_ => this.toastr.success('Entidad eliminado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al eliminar el Insumo');
        throw error;
      })
    );
}
}
