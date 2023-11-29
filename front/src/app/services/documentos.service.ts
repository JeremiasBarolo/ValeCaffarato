import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AppSettings } from 'appsettings-json-reader';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  private apiUrl = `${this.appSettings.url_api}/documento`;
  private Url = `${this.appSettings.url_api}`;
  
  //get all
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // get by id
  getById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`)
    
  }

// create
  create(any: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, any)
    
}

// update
  update(id: number, any: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, any)
   
}

// delete
  delete(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`)
    
}

generarPdf(documento:any, productData: any, clienteData: any, subtotal: any): Observable<any> {
  
  return this.http.post<any>(`${this.Url}/generar-factura`, 
  {documento, productData, clienteData, subtotal})
    
}
}
