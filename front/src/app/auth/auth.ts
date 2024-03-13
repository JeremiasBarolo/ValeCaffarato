import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private tokenService: TokenService,
    private toastr: ToastrService,
    ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    
    if (!token || !this.tokenService.isTokenValid(token)) {

      this.router.navigate(['/login']); 
      this.toastr.error('Debes iniciar sesion para acceder a la app');
      return false;
    }  
    return true;
  }
}
