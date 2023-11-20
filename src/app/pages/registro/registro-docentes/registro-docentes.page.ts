import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDocente } from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignaturasService } from '../../../services/asignaturas/asignaturas.service';
import { DataService } from '../../../services/data/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-registro-docentes',
  templateUrl: './registro-docentes.page.html',
  styleUrls: ['./registro-docentes.page.scss'],
})
export class RegistroDocentesPage implements OnInit {

  newDocente: IDocente = {
    id: 0,
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    asignaturas: [],
    año: '',
    semestre: '',
    horassemanales: '',
  };

  docenteForm: FormGroup;

  asignaturasSeleccionadas: string[] = [];
  email: string = '';

  constructor(private alertController: AlertController, private auth: AuthService, private router: Router,private fb: FormBuilder, private http: HttpClient, private asignaturasService: AsignaturasService, private dataService: DataService) {
    this.docenteForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      asignaturas: [[]],
      año: ['', [Validators.required]],
      semestre: ['', [Validators.required]],
      horassemanales: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
    
  }

  ngOnInit() {
  }

  async guardar() {
    const alert = await this.alertController.create({
      header: 'Registrar Docente',
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
            this.registrarDocente();
          }
        }
      ]
    });
    await alert.present();
  }

  registrarDocente() {
      if (this.docenteForm.valid) {
        if( this.docenteForm.value.password === this.docenteForm.value.password2) {
        this.asignaturasSeleccionadas = this.asignaturasService.obtenerAsignaturasSeleccionadas();
        this.newDocente.email = this.dataService.getCorreoElectronico();
        this.newDocente.asignaturas = this.asignaturasSeleccionadas;
        this.newDocente.password = this.docenteForm.value.password;
        this.newDocente.nombre = this.docenteForm.value.nombre;
        this.newDocente.apellido = this.docenteForm.value.apellido;
        this.newDocente.año = this.docenteForm.value.año;
        this.newDocente.semestre = this.docenteForm.value.semestre;
        this.newDocente.horassemanales = this.docenteForm.value.horassemanales;
        this.auth.presentToast('Profesor/a registrado/a con éxito!!');
        this.http.post('http://localhost:3300/docentes', this.newDocente).subscribe((respuesta) => {
          console.log('Docente registrado con éxito!');
          this.router.navigate(['/login'])
        }
        
        )
      }
    }
  }
}
