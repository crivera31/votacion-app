import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VotacionService } from '../../service/votacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private votacionService: VotacionService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  isValidField(field: string): boolean {
    return ((this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid);
  }

  login() {
    this.votacionService.login(this.loginForm.value).subscribe(
      res => {
        /**redirigir a dashboard */
        this.router.navigateByUrl('/dashboard');
        Swal.fire('Bienvenido',res.username,'success');
      },
      err => {
        console.log(err);
      }
    );
  }

}
