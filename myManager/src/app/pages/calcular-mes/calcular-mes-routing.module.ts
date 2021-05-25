import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcularMesPage } from './calcular-mes.page';

const routes: Routes = [
  {
    path: '',
    component: CalcularMesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalcularMesPageRoutingModule {}
