import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesRoutingModule } from './detalles-routing.module';
import { DetallesComponent } from './detalles.component';
import { PhoneFormatModule } from 'src/app/pipes/phoneformat/phoneformat.module';


@NgModule({
  declarations: [
    DetallesComponent
  ],
  imports: [
    CommonModule,
    DetallesRoutingModule,
    PhoneFormatModule
  ]
})
export class DetallesModule { }
