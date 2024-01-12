import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from '../models/pedidos';
import { AppSettings } from 'appsettings-json-reader';
import { LoginComponent } from '../auth/login/login.component';

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
    if(Pedidos.category === 'COMPRA'){
      return this.http.post<any>(`${this.apiUrl}/compra`, Pedidos)
    }else{
      console.log(Pedidos);
      
      return this.http.post<any>(`${this.apiUrl}/venta`, Pedidos)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleHttpError(error);
          return throwError(error);
        })
      );
      
      
    }
}

// update
  update(id: number, Pedidos: any): Observable<Pedidos> {
    console.log(Pedidos);
    

    if(Pedidos.category === 'COMPRA'){
      return this.http.put<Pedidos>(`${this.apiUrl}/${id}`, Pedidos)

    } else if(Pedidos.category === 'VENTA' && Pedidos.state === 'PRESUPUESTADO'){
      console.log(Pedidos);
      
      return this.http.put<Pedidos>(`${this.apiUrl}/venta/editar/${id}`, Pedidos)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleHttpError(error);
          return throwError(error);
        })

      );
    }else{
      return this.http.put<Pedidos>(`${this.apiUrl}/${id}`, Pedidos)
    }
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

private handleHttpError(error: HttpErrorResponse): void {
  if (error.error instanceof ErrorEvent) {
   
    this.toastr.error('Error del lado del cliente: ' + error.error.message);
  } else {
    
    const errorMessages = this.extractErrorMessage(error);

    
    errorMessages.forEach((message: string | undefined) => {
      this.toastr.error(message, 'Error', { timeOut: 5000 });
    });
  }
}
private extractErrorMessage(error: HttpErrorResponse): string[] {
  if (error.error && error.error.error && error.error.error.length > 0) {
    const firstError = error.error.error[0];
    if (firstError.msg) {
      
      return firstError.msg.split(' , ').filter((message: string) => message.trim() !== '');
    }
  }
  return ['Error desconocido'];
}

}
