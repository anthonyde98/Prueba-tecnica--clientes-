import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablecerRoutingModule } from './establecer-routing.module';
import { EstablecerComponent } from './establecer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EstablecerComponent
  ],
  imports: [
    CommonModule,
    EstablecerRoutingModule,
    ReactiveFormsModule
  ]
})
export class EstablecerModule { }
