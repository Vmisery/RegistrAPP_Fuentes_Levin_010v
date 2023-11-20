import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilestudiantePageRoutingModule } from './perfilestudiante-routing.module';

import { PerfilestudiantePage } from './perfilestudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PerfilestudiantePageRoutingModule
  ],
  declarations: [PerfilestudiantePage]
})
export class PerfilestudiantePageModule {}
