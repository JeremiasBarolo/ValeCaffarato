import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Insumo } from '../models/insumo';
import { AppSettings } from 'appsettings-json-reader';


@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }

  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/insumos`;
  //get all
  getAll(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Insumo> {
  return this.http.get<Insumo>(`${this.apiUrl}/${id}`)
}

// create
  create(Insumo: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Insumo)
}

// update
  update(id: number, Insumo: FormData): Observable<Insumo> {
  return this.http.put<Insumo>(`${this.apiUrl}/${id}`, Insumo)
}

// delete
  delete(id: number): Observable<Insumo> {
  return this.http.delete<Insumo>(`${this.apiUrl}/${id}`)
}
}
