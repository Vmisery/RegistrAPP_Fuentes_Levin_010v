import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data/data.service';
import { IAlumno } from '../../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.page.html',
  styleUrls: ['./registro-alumnos.page.scss'],
})
export class RegistroAlumnosPage implements OnInit {
  alumnoForm: FormGroup;
  newAlumno: IAlumno = {
    id: 0,
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    rut: ''
  }

  constructor(private router: Router, private auth: AuthService, private alertController: AlertController, private fb: FormBuilder, private dataService: DataService, private http: HttpClient) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      password: ['', Validators.required], 
      password2: ['', Validators.required]
    })
   }

  ngOnInit() {
  }

  async guardar() {
    const alert = await this.alertController.create({
      header: 'Registrar Alumno',
      message: '¿Deseas registrarte con la información proporcionada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.registrarAlumno();
          }
        }
      ]
    });
    await alert.present();
  }

  registrarAlumno() {
    if (this.alumnoForm.valid) {
      if( this.alumnoForm.value.password === this.alumnoForm.value.password2) {
      this.newAlumno.email = this.dataService.getCorreoElectronico();
      this.newAlumno.nombre = this.alumnoForm.value.nombre;
      this.newAlumno.apellido = this.alumnoForm.value.apellido;
      this.newAlumno.password = this.alumnoForm.value.password;
      this.newAlumno.rut = this.alumnoForm.value.rut;
      this.auth.presentToast('Alumno/a registrado/a con éxito!!');
      this.http.post('http://localhost:3300/alumnos', this.newAlumno).subscribe((respuesta) => {
        this.router.navigate(['/login'])
      }
      )
    }
  } else {

  }
}

}
