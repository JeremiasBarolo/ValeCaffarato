import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InsumoEntity } from '../models/insumo-entity';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class InsumoEntityService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/insumos_entity`;
  
  //get all
  getAll(): Observable<InsumoEntity[]> {
    return this.http.get<InsumoEntity[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<InsumoEntity> {
  return this.http.get<InsumoEntity>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(error => {
        this.toastr.error('Error al obtener el InsumoEntity');
        throw error;
      })
    );
  }

// create
  create(InsumoEntity: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, InsumoEntity)
    .pipe(
      tap(_ => this.toastr.success('Entidad creada exitosamente')),
      catchError(error => {
        this.toastr.error('Error al crear el InsumoEntity');
        throw error;
      })
    );
}

// update
  update(id: number, InsumoEntity: FormData): Observable<InsumoEntity> {
  return this.http.put<InsumoEntity>(`${this.apiUrl}/${id}`, InsumoEntity)
    .pipe(
      tap(_ => this.toastr.success('Entidad actualizado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al actualizar el InsumoEntity');
        throw error;
      })
    );
}

// delete
  delete(id: number): Observable<InsumoEntity> {
  return this.http.delete<InsumoEntity>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(_ => this.toastr.success('Entidad eliminado exitosamente')),
      catchError(error => {
        this.toastr.error('Error al eliminar el InsumoEntity');
        throw error;
      })
    );
}
}
