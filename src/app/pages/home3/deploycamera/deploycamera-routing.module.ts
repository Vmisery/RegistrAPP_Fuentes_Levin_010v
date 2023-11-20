import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeploycameraPage } from './deploycamera.page';

const routes: Routes = [
  {
    path: '',
    component: DeploycameraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeploycameraPageRoutingModule {}
