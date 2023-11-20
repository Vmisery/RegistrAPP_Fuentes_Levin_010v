import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfildocentePage } from './perfildocente.page';

const routes: Routes = [
  {
    path: '',
    component: PerfildocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfildocentePageRoutingModule {}
