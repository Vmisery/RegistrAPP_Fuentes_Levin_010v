import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deploycamera',
  templateUrl: './deploycamera.page.html',
  styleUrls: ['./deploycamera.page.scss'],
})
export class DeploycameraPage implements OnInit {

  result: String = '';
  alumno: any = {};
  alumnonew: any = {};
  constructor(private http: HttpClient, private auth: AuthService, private data: DataService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.alumno = this.data.getUserData();
    this.alumnonew.id = this.alumno.id;
    this.alumnonew.nombre = this.alumno.nombre;
    this.alumnonew.apellido = this.alumno.apellido;
    this.alumnonew.rut = this.alumno.rut;
    this.alumnonew.presente = true;
    console.log(this.alumnonew);
  }

  registrarAlumno(result: string) {
    this.http.get(result)
      .subscribe(
        (claseRegistrada: any) => {
          console.log('Datos actuales de la clase registrada:', claseRegistrada);
          claseRegistrada.alumnos.push(this.alumnonew);
          this.http.post(result, claseRegistrada)
            .subscribe(
              response => {
                this.auth.presentToast('Asistencia registrada correctamente!');
                console.log('Solicitud POST exitosa:', response);
              },
              error => {
                console.error('Error en la solicitud POST:', error);
              }
            );
        },
        error => {
          console.error('Error en la solicitud GET:', error);
        }
      );
  }

  onScanSuccess(result: string) {
    this.registrarAlumno(result);
    console.log('URL escaneada:', result);
    this.http.post(result, this.alumnonew).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
        this.auth.presentToast('Asistencia registrada correctamente!');
        this.result = result;
      },
      error => {
        console.error('Error en la solicitud POST:', error);
      }
    );
  }
}
