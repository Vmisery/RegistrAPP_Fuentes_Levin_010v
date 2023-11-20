import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/guard/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./pages/home2/home2.module').then( m => m.Home2PageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'home3',
    loadChildren: () => import('./pages/home3/home3.module').then( m => m.Home3PageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/home2/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'perfildocente',
    loadChildren: () => import('./pages/home2/perfildocente/perfildocente.module').then( m => m.PerfildocentePageModule)
  },
  {
    path: 'perfilestudiante',
    loadChildren: () => import('./pages/home3/perfilestudiante/perfilestudiante.module').then( m => m.PerfilestudiantePageModule)
  },
  {
    path: 'codigoqr',
    loadChildren: () => import('./pages/home2/codigoqr/codigoqr.module').then( m => m.CodigoqrPageModule)
  },
  {
    path: 'deploycamera',
    loadChildren: () => import('./pages/home3/deploycamera/deploycamera.module').then( m => m.DeploycameraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
