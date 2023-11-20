import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { iclase_registrada } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  public asignaturaSeleccionada: boolean = true;
  public selectedAsignatura: number = 0;
  constructor(private router: Router, private toastController: ToastController, private data: DataService, private auth: AuthService, private alertController: AlertController, private http: HttpClient) { 
    const fechaActual = new Date();
    const opcionesFecha: Intl.DateTimeFormatOptions = { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'};
    this.fechaAsistencia = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
  }
  
  public userData: any = {};
  public fechaAsistencia: string = "";
  public clasesData: any = {};
  newclaseregistrada: iclase_registrada = {
    id: 0,
    id_asignatura: 0,
    id_docente: '',
    alumnos: [],
    fecha: ''
  }

  ngOnInit() {
    this.userData = this.data.getUserData();
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

  onAsignaturaChange(event: any) {
    this.asignaturaSeleccionada = event.detail.value ? false : true;
    this.selectedAsignatura = event.detail.value;
    console.log(this.newclaseregistrada.id_asignatura)
  }

  async generarQR() {
    const alert = await this.alertController.create({
      header: 'Generar QR',
      message: '¿Deseas generar el código QR de asistencia para esta clase?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            this.newclaseregistrada.id_docente = this.userData.id;
            this.newclaseregistrada.id_asignatura = this.selectedAsignatura;
            this.newclaseregistrada.fecha = this.fechaAsistencia;
            await this.registrarClase().toPromise(); 
            this.presentToast("Clase registrada con éxito!");
            this.router.navigate(['/codigoqr']);
          }
        }
      ]
    });
    await alert.present();
  }

  getDataClases(){ 
    return this.clasesData;
  }

  registrarClase(): Observable<any> {
    return new Observable(observer => {
      this.http.post('http://localhost:3300/clases_registradas', this.newclaseregistrada, { observe: 'response' }).subscribe((response: HttpResponse<any>) => {
        this.clasesData = response.body;
        this.data.setClasesData(this.clasesData);
        console.log(this.data.getClasesData());
        observer.next(this.clasesData);
        observer.complete();
      });
    });
  }
}
