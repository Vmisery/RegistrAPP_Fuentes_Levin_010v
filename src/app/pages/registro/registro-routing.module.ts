import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage
  },
  {
    path: 'registro-alumnos',
    loadChildren: () => import('./registro-alumnos/registro-alumnos.module').then( m => m.RegistroAlumnosPageModule)
  },
  {
    path: 'registro-docentes',
    loadChildren: () => import('./registro-docentes/registro-docentes.module').then( m => m.RegistroDocentesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
