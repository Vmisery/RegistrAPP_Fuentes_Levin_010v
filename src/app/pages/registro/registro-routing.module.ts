import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/services/guard/authentication.guard';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage
  },
  {
    path: 'registro-alumnos',
    loadChildren: () => import('./registro-alumnos/registro-alumnos.module').then( m => m.RegistroAlumnosPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'registro-docentes',
    loadChildren: () => import('./registro-docentes/registro-docentes.module').then( m => m.RegistroDocentesPageModule),
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
