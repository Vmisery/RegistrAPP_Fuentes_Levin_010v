import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private correoElectronico: string = '';

  setCorreoElectronico(correo: string) {
    this.correoElectronico = correo;
  }

  getCorreoElectronico() {
    return this.correoElectronico;
  }

  constructor() { }
}
