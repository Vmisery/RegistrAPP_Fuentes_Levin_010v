import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfildocentePageRoutingModule } from './perfildocente-routing.module';
import { PerfildocentePage } from './perfildocente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfildocentePageRoutingModule,
  ],
  declarations: [PerfildocentePage],
})
export class PerfildocentePageModule {}
