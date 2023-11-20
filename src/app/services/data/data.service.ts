import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private correoElectronico: string = '';
  private isLoggin: Boolean = false;
  private token: string = '';
  private userType: Boolean = false;
  private userData: any = {};
  public clasesData: any = {};

  private clasesDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public clasesData$: Observable<any> = this.clasesDataSubject.asObservable();
  
  setClasesData(data: any){
    this.clasesData = data;
  }

  getClasesData(){
    return this.clasesData;
  }

  setCorreoElectronico(correo: string) {
    this.correoElectronico = correo;
  }

  setUserData(id: String, email: String, nombre: String, apellido: String, asignaturas: any[], anio: String, semestre: String, horassemanales: String, password: String){
    this.userData = {
      id,
      email,
      nombre,
      apellido,
      asignaturas,
      anio,
      semestre,
      horassemanales,
      password
    };
  }

  setUserData2(id: String, email: String, nombre: String, apellido: String, rut: String, password: String){
    this.userData = {
      id,
      email,
      nombre,
      apellido,
      rut,
      password
    }
  }

  deleteUserData(){
    this.userData = {};
  }

  getUserData(): any{
    return this.userData
  }
  
  getCorreoElectronico() {
    return this.correoElectronico;
  }

  getUserType() {
    return this.userType;
  }

  setEstudiante(){
    this.userType = false;
  }

  setDocente(){
    this.userType = true;
  }

  isLogged(){
    return this.isLoggin
  }

  getToken(){
    return this.token;
  }

  setToken(){
    this.token = 'pruebatoken'
  }

  deleteToken(){
    this.token = ''
  }

  sucess() {
    this.isLoggin = true;
  }

  Logout(){
      this.isLoggin = false;
  }

  constructor() { }
}
