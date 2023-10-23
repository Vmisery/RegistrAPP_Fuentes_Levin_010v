import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  email: string = '';
  errorMensaje: string = '';
  constructor(private router: Router, private dataService: DataService) { }

  registrar(email: string) {
    this.errorMensaje = '';

    if (email.endsWith('@duocuc.cl')) {
      this.dataService.setCorreoElectronico(email);
      console.log(email)
      this.router.navigate(['/registro/registro-alumnos']);
    } else if (email.endsWith('@profesorduoc.cl')) {
      this.dataService.setCorreoElectronico(email);
      console.log(email)
      this.router.navigate(['/registro/registro-docentes']);
    } else {
      this.errorMensaje = 'Por favor ingresar un correo institucional'; 
    }

  }

}
