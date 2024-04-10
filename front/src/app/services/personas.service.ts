import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../models/Persona';
import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/personas`;
  
  //get all
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<Persona> {
  return this.http.get<Persona>(`${this.apiUrl}/${id}`)
  
}

// create
  create(Persona: any): Observable<any> {
    
    
  return this.http.post<any>(`${this.apiUrl}`, Persona)
   
}

// update
  update(id: number, Persona: FormData): Observable<Persona> {
    
    
  return this.http.put<Persona>(`${this.apiUrl}/${id}`, Persona)
    
}

// delete
  delete(id: number): Observable<Persona> {
  return this.http.delete<Persona>(`${this.apiUrl}/${id}`)
    
}
}
