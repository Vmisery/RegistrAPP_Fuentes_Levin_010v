import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public alertController: AlertController, private router: Router, public toastController: ToastController, private data: DataService) { }

  private apiUrldocentes = 'http://localhost:3300/docentes';
  private apiUrlalumnos = 'http://localhost:3300/alumnos';
  
  updateDocente(id: String, updatedData: any): Promise<any> {
    const apiUrl = `${this.apiUrldocentes}/${id}`;
  
    return this.http.put(apiUrl, updatedData).toPromise();
  }

  
  updateAlumnos(id: String, updatedData: any): Promise<any> {
    const apiUrl = `${this.apiUrlalumnos}/${id}`;
  
    return this.http.put(apiUrl, updatedData).toPromise();
  }

  async Alerta(header: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'bottom', 
      color: 'dark' 
    });
  
    toast.present();
  }

  listaalumnos(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.apiUrlalumnos).subscribe((alumnos: any[]) => {
        let validado = false;
        let existeemail = false;
        let id = "";
        let email2 = "";
        let nombre = "";
        let apellido = "";
        let rut = "";
        let passworddata = "";
        alumnos.forEach(alumno => {
          if (alumno.email === email && alumno.password === password) {
            console.log('Credenciales válidas para el Alumno:', alumno);
            validado = true;
            id = alumno.id;
            nombre = alumno.nombre;
            apellido = alumno.apellido;
            email2 = alumno.email;
            rut = alumno.rut;
            passworddata = alumno.password;
            this.data.setUserData2(id, email, nombre, apellido, rut, passworddata)
            this.presentToast(`¡Bienvenido/a! ${nombre} ${apellido}`)
          } else if (alumno.email === email && alumno.password != password){
            existeemail = true;
          } else {
            console.log(email, password)
          }
        }
        );
        if (existeemail){
          this.Alerta("Contraseña inválida", "Verifica tu contraseña")
        } else if (!validado) {
          this.Alerta("Alumno no encontrado","El alumno ingresado no posee una cuenta registrada")
        }
        resolve(validado);
      }, error => {
        console.error('Error al obtener la lista de alumnos:', error);
        reject(error);
      });
    });
  }

  listadocentes(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.apiUrldocentes).subscribe((docentes: any[]) => {
        let validado = false;
        let existeemail= false;
        let id = "";
        let email2 = "";
        let nombre = "";
        let apellido = "";
        let asignaturas = [];
        let anio = "";
        let semestre = "";
        let horassemanales = "";
        let passworddata = "";
        docentes.forEach(docente => {
          if (docente.email === email && docente.password === password) {
            console.log('Credenciales válidas para el docente:', docente);
            validado = true;
            id = docente.id;
            email2 = docente.email;
            nombre = docente.nombre;
            apellido = docente.apellido;
            asignaturas= docente.asignaturas;
            anio = docente.año;
            semestre = docente.semestre;
            horassemanales = docente.horassemanales;
            passworddata = docente.password;
            this.data.setUserData(id, email2, nombre, apellido, asignaturas, anio, semestre, horassemanales, passworddata)
            this.presentToast(`¡Bienvenido/a Profesor/a! ${nombre} ${apellido}`)
          } else if (docente.email === email && docente.password != password){
            existeemail = true;
          } else {
            console.log(email, password)
          }
        }
        );
        if (existeemail){
          this.Alerta("Contraseña inválida", "Verifica tu contraseña")
        } else if (!validado) {
          this.Alerta("Docente no encontrado","El docente ingresado no posee una cuenta registrada")
        }
        resolve(validado);
      }, error => {
        console.error('Error al obtener la lista de docentes:', error);
        reject(error);
      });
    });
  }

  registroalumno(email: string){
    this.http.get<any[]>(this.apiUrlalumnos).subscribe((alumnos: any[]) => {
      let existe = false;
      alumnos.forEach(alumno => {
        if (alumno.email === email) {
          existe = true;}
      })
      if (!existe){
        this.router.navigate(['/registro/registro-alumnos'])
      } else{
        this.Alerta("Correo existente", "Este correo electrónico está asociado a una cuenta existente")
      }
    })
  }

  registrodocente(email: string){
    this.http.get<any[]>(this.apiUrldocentes).subscribe((docentes: any[]) => {
      let existe = false;
      docentes.forEach(docente => {
        if (docente.email === email) {
          existe = true;}
      })
      if (!existe){
        this.router.navigate(['/registro/registro-docentes'])
      } else{
        this.Alerta("Correo existente", "Este correo electrónico está asociado a una cuenta existente")
      }
    })
  }






}