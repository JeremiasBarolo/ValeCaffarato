import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/localidades`;
  
  //get all
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`); 
  }

  // get by id
  getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`)
    
  }

// create
  create(Entity: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, Entity)
    
}

// update
  update(id: number, Entity: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, Entity)

}

// delete
  delete(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`)
    
}

filtradas(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/filtradas/${id}`)
    
}
}
