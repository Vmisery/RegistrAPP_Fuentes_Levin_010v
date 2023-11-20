import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { IonicModule } from '@ionic/angular';

import { DeploycameraPageRoutingModule } from './deploycamera-routing.module';

import { DeploycameraPage } from './deploycamera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    DeploycameraPageRoutingModule
  ],
  declarations: [DeploycameraPage]
})
export class DeploycameraPageModule {}
