import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, public alertController: AlertController, private router: Router) { }

  private apiUrldocentes = 'http://localhost:3300/docentes';
  private apiUrlalumnos = 'http://localhost:3300/alumnos';

  listaalumnos(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.apiUrlalumnos).subscribe((alumnos: any[]) => {
        let validado = false;
        let existeemail = false;
        alumnos.forEach(alumno => {
          if (alumno.email === email && alumno.password === password) {
            console.log('Credenciales válidas para el docente:', alumno);
            validado = true;
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
        docentes.forEach(docente => {
          if (docente.email === email && docente.password === password) {
            console.log('Credenciales válidas para el docente:', docente);
            validado = true;
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

 async Alerta(header: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}