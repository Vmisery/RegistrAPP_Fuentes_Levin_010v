import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data/data.service';
import { IAlumno } from '../../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';


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

  constructor(private fb: FormBuilder, private dataService: DataService, private http: HttpClient) {
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

  registrarAlumno() {
    if (this.alumnoForm.valid) {
      if( this.alumnoForm.value.password === this.alumnoForm.value.password2) {
      this.newAlumno.email = this.dataService.getCorreoElectronico();
      this.newAlumno.nombre = this.alumnoForm.value.nombre;
      this.newAlumno.apellido = this.alumnoForm.value.apellido;
      this.newAlumno.password = this.alumnoForm.value.password;
      this.newAlumno.rut = this.alumnoForm.value.rut;
      console.log(this.newAlumno)
      this.http.post('http://localhost:3300/alumnos', this.newAlumno).subscribe((respuesta) => {
        console.log('Alumno registrado con éxito', respuesta);
      }
      )
    }
  } else {

  }
}

}
