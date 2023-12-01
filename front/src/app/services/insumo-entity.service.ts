import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class InsumoEntityService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/insumos_entity`;
  
  //get all
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`)
    
  }

// create
  create(InsumoEntity: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, InsumoEntity)
    
}

// update
  update(id: number, InsumoEntity: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, InsumoEntity)

}

// delete
  delete(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`)
    
}
}
