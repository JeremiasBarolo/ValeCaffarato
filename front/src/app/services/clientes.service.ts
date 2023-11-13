import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'appsettings-json-reader';
 
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/clientes`;
  //get all
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Cliente> {
  return this.http.get<Cliente>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al obtener el Cliente');
        throw error;
      })
    );
}

// create
  create(Cliente: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Cliente)
    .pipe(
      tap(_ => this.toastr.success('Clientes creado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al crear el Cliente');
        throw error;
      })
    );
}

// update
  update(id: number, Cliente: FormData): Observable<Cliente> {
  return this.http.put<Cliente>(`${this.apiUrl}/${id}`, Cliente)
    .pipe(
      tap(_ => this.toastr.success('Cliente actualizado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al actualizar el Cliente');
        throw error;
      })
    );
}

// delete
  delete(id: number): Observable<Cliente> {
  return this.http.delete<Cliente>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(_ => this.toastr.success('Cliente eliminado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al eliminar el Cliente');
        throw error;
      })
    );
}
}
