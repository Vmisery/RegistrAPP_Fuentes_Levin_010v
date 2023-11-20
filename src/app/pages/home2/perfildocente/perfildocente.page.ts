import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-perfildocente',
  templateUrl: './perfildocente.page.html',
  styleUrls: ['./perfildocente.page.scss'],
})
export class PerfildocentePage implements OnInit {

  constructor(public fb: FormBuilder, private data: DataService, private alertController: AlertController, private authService: AuthService, private toastController: ToastController) { 
  }
  public editmode : Boolean = false;
  public userData: any = {};
  public uncensoredPassword: string = ''; 
  public updatedData: any = {};

  public editform: FormGroup = this.fb.group({
    nombre: new FormControl({ value: '', disabled: true }, [Validators.required]),
    apellido: new FormControl({ value: '', disabled: true }, [Validators.required]),
    anio: new FormControl({ value: '', disabled: true }, [Validators.required]),
    semestre: new FormControl({ value: '', disabled: true }, [Validators.required]),
    horasS: new FormControl({ value: '', disabled: true }, [Validators.required]),
    passwordedit: new FormControl({ value: '', disabled: true}, [Validators.required])
  });

  ngOnInit() {
    this.userData = this.data.getUserData();
    this.uncensoredPassword = this.userData.password;
    this.editform.patchValue({
      nombre: this.userData.nombre,
      apellido: this.userData.apellido,
      anio: this.userData.anio,
      semestre: this.userData.semestre,
      horasS: this.userData.horassemanales,
      passwordedit: this.userData.password
    });
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

  async editar() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      message: '¿Deseas editar tu información personal?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.editmode = true;
            this.editform.enable();
          }
        }
      ]
    });
    await alert.present();
  }

  cancelar(){
    this.editmode = false;
    this.editform.patchValue({
    nombre: this.userData.nombre,
    apellido: this.userData.apellido,
    anio: this.userData.anio,
    semestre: this.userData.semestre,
    horasS: this.userData.horassemanales,
    passwordedit: this.userData.password });
    this.editform.disable();
  }

  setUpdatedData(){
    this.updatedData = {
      id: this.userData.id,
      email: this.userData.email,
      nombre: this.editform.value.nombre,
      apellido: this.editform.value.apellido,
      asignaturas: this.userData.asignaturas,
      año: this.editform.value.anio,
      semestre: this.editform.value.semestre,
      password: this.editform.value.passwordedit,
      horassemanales: this.editform.value.horasS
    }
  };

  async guardar() {
    const alert = await this.alertController.create({
      header: 'Guardar cambios',
      message: '¿Deseas guardar los datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.editmode = true;
            this.editform.enable();
            this.userData.nombre = this.editform.value.nombre;
            this.userData.apellido = this.editform.value.apellido;
            this.userData.anio = this.editform.value.anio;
            this.userData.semestre = this.editform.value.semestre;
            this.userData.horassemanales = this.editform.value.horasS;
            this.userData.password = this.editform.value.passwordedit;
            this.setUpdatedData();
            this.authService.updateDocente(this.userData.id, this.updatedData);
            console.log(this.userData);
            this.presentToast("Datos guardados exitosamente!");
            this.cancelar();
          }
        }
      ]
    });
    await alert.present();
  }

}
