import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfilestudiante',
  templateUrl: './perfilestudiante.page.html',
  styleUrls: ['./perfilestudiante.page.scss'],
})
export class PerfilestudiantePage implements OnInit {
  public editmode : Boolean = false;
  public userData: any = {};
  public uncensoredPassword: string = ''; 
  public updatedData: any = {};

  constructor(public fb: FormBuilder, private data: DataService, private alertController: AlertController, private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {
    this.userData = this.data.getUserData();
    this.uncensoredPassword = this.userData.password;
    this.editform.patchValue({
      nombre: this.userData.nombre,
      apellido: this.userData.apellido,
      rut: this.userData.rut,
      passwordedit: this.userData.password
    });
  }

  public editform: FormGroup = this.fb.group({
    nombre: new FormControl({ value: '', disabled: true }, [Validators.required]),
    apellido: new FormControl({ value: '', disabled: true }, [Validators.required]),
    rut: new FormControl({ value: '', disabled: true }, [Validators.required]),
    passwordedit: new FormControl({ value: '', disabled: true}, [Validators.required])
  });
  
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

  setUpdatedData(){
    this.updatedData = {
      id: this.userData.id,
      email: this.userData.email,
      nombre: this.editform.value.nombre,
      apellido: this.editform.value.apellido,
      rut: this.editform.value.rut,
      password: this.editform.value.passwordedit,
    }
  };

  cancelar(){
    this.editmode = false;
    this.editform.patchValue({
    nombre: this.userData.nombre,
    apellido: this.userData.apellido,
    rut: this.userData.rut,
    passwordedit: this.userData.password });
    this.editform.disable();
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
            this.userData.rut = this.editform.value.rut;
            this.userData.password = this.editform.value.passwordedit;
            this.setUpdatedData();
            this.authService.updateAlumnos(this.userData.id, this.updatedData);
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
