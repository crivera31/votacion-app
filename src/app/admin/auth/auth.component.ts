import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  isValidField(field: string): boolean {
    return ((this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid);
  }

  login() {
    console.log(this.loginForm.value)
    // this.usuario.email = this.loginForm.get('email').value;
    // this.usuario.password = this.loginForm.get('password').value;    
    // this.usuarioService.login(this.usuario).subscribe(
    //   res => {
    //     console.log("Logueado => " ,res);
    //     /**redirigir a dashboard */
        this.router.navigateByUrl('/dashboard');
    //     this.baseService.msgSuccess(res.msg);
    //   },
    //   err => {
    //     // console.log(err);
    //     this.baseService.msgError(err.error.msg);
    //   }
    // );
  }

}
