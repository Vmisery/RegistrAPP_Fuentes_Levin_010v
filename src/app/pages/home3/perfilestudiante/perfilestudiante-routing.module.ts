import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilestudiantePage } from './perfilestudiante.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilestudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilestudiantePageRoutingModule {}
