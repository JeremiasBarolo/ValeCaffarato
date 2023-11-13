import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from '../models/proveedor';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/proveedores`;
  
  //get all
  getAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Proveedor> {
  return this.http.get<Proveedor>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al obtener el Proveedor');
        throw error;
      })
    );
}

// create
  create(Proveedor: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Proveedor)
    .pipe(
      tap(_ => this.toastr.success('Proveedors creado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al crear el Proveedor');
        throw error;
      })
    );
}

// update
  update(id: number, Proveedor: FormData): Observable<Proveedor> {
  return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, Proveedor)
    .pipe(
      tap(_ => this.toastr.success('Proveedor actualizado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al actualizar el Proveedor');
        throw error;
      })
    );
}

// delete
  delete(id: number): Observable<Proveedor> {
  return this.http.delete<Proveedor>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(_ => this.toastr.success('Proveedor eliminado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al eliminar el Proveedor');
        throw error;
      })
    );
  }
}
