import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
  formularioregistro: FormGroup;
  constructor(private router: Router, public http: HttpClient, public fb: FormBuilder, private auth: AuthService, private data: DataService) { 

  this.formularioregistro = this.fb.group({
    'email': new FormControl("", [Validators.email, Validators.required])
  })
}
  registrar() {
    this.data.setCorreoElectronico(this.formularioregistro.value.email)
    if(this.formularioregistro.value.email.endsWith("@duocuc.cl")){
      this.auth.registroalumno(this.formularioregistro.value.email)
    }else if(this.formularioregistro.value.email.endsWith("@profesorduoc.cl")){
      this.auth.registrodocente(this.formularioregistro.value.email)
    }else{
      if(this.formularioregistro.value.email == ''){
        this.auth.Alerta("Correo vacío","Por favor, ingresa un correo institucional")}
      else{
        this.auth.Alerta("Correo no permitido","Por favor, ingresa un correo institucional")
      }
    }
    }
  }
