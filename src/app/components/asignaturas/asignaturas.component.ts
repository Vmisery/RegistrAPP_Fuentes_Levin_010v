import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsignaturasService } from '../../services/asignaturas/asignaturas.service';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss'],
})
export class AsignaturasComponent  implements OnInit {
  asignaturas: any[] = [];
  
  constructor(private http: HttpClient,  private asignaturasService: AsignaturasService, private popoverController: PopoverController, private datas: DataService) { 
  }

  
  ngOnInit() {
    this.http.get<any[]>('http://localhost:3300/asignaturas').subscribe((data) => {
      this.asignaturas = data;
    });
  }
  asignaturasSeleccionadas: string[] = [];
  asignaturasData: any[] = []


  asignaturaSeleccionada(asignatura: any) {
    const index = this.asignaturas.indexOf(asignatura);
    this.asignaturasService.setAsignaturasSeleccionadas(this.asignaturasSeleccionadas);
    if (index !== -1 && !this.asignaturasSeleccionadas.includes(asignatura)) {
      if (!this.asignaturasSeleccionadas.includes(asignatura)) {
        this.asignaturasSeleccionadas.push(asignatura);
      }
    } else {
      if (this.asignaturasSeleccionadas.includes(asignatura)) {
        this.asignaturasSeleccionadas.splice(this.asignaturasSeleccionadas.indexOf(asignatura), 1);
      }
    }
  }

  getasignaturaSeleccionada() {
    return this.asignaturasSeleccionadas;
  }

  getasignaturasData(){
    return this.asignaturasData;
  }

  



}
