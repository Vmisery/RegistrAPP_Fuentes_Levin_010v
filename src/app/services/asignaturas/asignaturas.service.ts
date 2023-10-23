// asignaturas.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsignaturasService {
  asignaturasSeleccionadas: string[] = [];

  constructor() {}


  obtenerAsignaturasSeleccionadas() {
    return this.asignaturasSeleccionadas;
  }

  setAsignaturasSeleccionadas(asignaturas: any[]): void {
    this.asignaturasSeleccionadas = asignaturas;
  }
}