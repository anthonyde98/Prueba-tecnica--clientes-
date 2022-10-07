import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { FormsModule } from '@angular/forms';
import { PhoneFormatModule } from 'src/app/pipes/phoneformat/phoneformat.module';
import { DeleteAlertComponent } from 'src/app/components/delete-alert/delete-alert.component';


@NgModule({
  declarations: [
    ListadoComponent,
    DeleteAlertComponent
  ],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    FormsModule,
    PhoneFormatModule
  ]
})
export class ListadoModule { }
