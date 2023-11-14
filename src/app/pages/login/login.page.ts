import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loggedIn: Boolean = false;
  loggedInUser: String = '';
  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder, private authService: AuthService, public alertController: AlertController) { 

    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.email),
      'password': new FormControl("", Validators.required)
    })
  }

  async login() {
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar los datos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    } else {
      const email = this.formularioLogin.value.email;
      const password = this.formularioLogin.value.password;
      
      let alert;
  
      if (email.endsWith("@duocuc.cl")) {
        this.authService.listaalumnos(email, password)
        .then((validado: boolean) => {
          console.log('prueba: ', validado) })
        .catch((error) => {
          console.error('Error al validar al alumno:', error);
        });
      } else if (email.endsWith("@profesorduoc.cl")) {
        this.authService.listadocentes(email, password)
        .then((validado: boolean) => {
          console.log('prueba: ', validado) })
        .catch((error) => {
          console.error('Error al validar al docente:', error);
        });
      } else {
        alert = await this.alertController.create({
          header: 'Correo no institucional',
          message: 'Tienes que ingresar con un correo Duoc',
          buttons: ['Aceptar']
        });
      }
      if (alert) {
        await alert.present();
      }
    }
  }
  ngOnInit() {
  }

}
