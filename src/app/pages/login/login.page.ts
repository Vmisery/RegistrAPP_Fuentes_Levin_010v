import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loggedIn: Boolean = false;
  loggedInUser: String = '';
  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) { 

    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.email),
      'password': new FormControl("", Validators.required)
    })
  }
  login() {
    if (this.formularioLogin.valid) {
      const email = this.formularioLogin.value.email;
      const password = this.formularioLogin.value.password;
      this.authService.listausuarios(email, password).subscribe((data) => {
        console.log(data)
      });
      if (email.endsWith("@duocuc.cl")) {
        console.log('')
      } else if (email.endsWith("@profesorduoc.cl"))
      {
        console.log('hola2')
      }
    }
  }

  ngOnInit() {
  }

}
