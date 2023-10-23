import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.page.html',
  styleUrls: ['./registro-alumnos.page.scss'],
})
export class RegistroAlumnosPage implements OnInit {
  alumnoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    })
   }

  ngOnInit() {
  }



}
