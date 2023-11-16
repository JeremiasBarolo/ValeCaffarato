import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from '../models/pedidos';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/pedidos`;
 
  //get all
  getAll(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Pedidos> {
  return this.http.get<Pedidos>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al obtener el Pedidos');
        throw error;
      })
    );
}

// create
  create(Pedidos: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Pedidos)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al crear el Pedidos');
        throw error;
      })
    );
}

// update
  update(id: number, Pedidos: FormData): Observable<Pedidos> {
  return this.http.put<Pedidos>(`${this.apiUrl}/${id}`, Pedidos)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al actualizar el Pedidos');
        throw error;
      })
    );
}

// delete
  delete(id: number): Observable<Pedidos> {
  return this.http.delete<Pedidos>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al eliminar el Pedidos');
        throw error;
      })
    );
}
}
