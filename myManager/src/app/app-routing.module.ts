import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'registrar-usuario',
    loadChildren: () => import('./pages/registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import('./pages/administracion/administracion.module').then( m => m.AdministracionPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'crear-cita',
    loadChildren: () => import('./pages/crear-cita/crear-cita.module').then( m => m.CrearCitaPageModule)
  },
  {
    path: 'modificar-cita',
    loadChildren: () => import('./pages/modificar-cita/modificar-cita.module').then( m => m.ModificarCitaPageModule)
  },
  {
    path: 'reseteo-clave',
    loadChildren: () => import('./pages/modals/reseteo-clave/reseteo-clave.module').then( m => m.ReseteoClavePageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./page/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
