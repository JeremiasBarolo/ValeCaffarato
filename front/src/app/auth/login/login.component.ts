import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    const userData = this.loginForm.value;
    this.usuarioService.login(userData).subscribe(response => {
      this.toastr.success('Bienvenido');
      localStorage.setItem('token', response.token);
      this.router.navigate(['dashboard/inicio']);
      setTimeout(() => {
        window.location.reload();
      }, 200)
      
     
    }, error => {
      this.toastr.error(error.error.message);
    });
  }
}
