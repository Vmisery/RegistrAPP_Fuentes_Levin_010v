import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroDocentesPageRoutingModule } from './registro-docentes-routing.module';

import { RegistroDocentesPage } from './registro-docentes.page';
import { AsignaturasComponent } from '../../../components/asignaturas/asignaturas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroDocentesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegistroDocentesPage, AsignaturasComponent]
})
export class RegistroDocentesPageModule {}
