import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalcularMesPageRoutingModule } from './calcular-mes-routing.module';

import { CalcularMesPage } from './calcular-mes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalcularMesPageRoutingModule
  ],
  declarations: [CalcularMesPage]
})
export class CalcularMesPageModule {}
