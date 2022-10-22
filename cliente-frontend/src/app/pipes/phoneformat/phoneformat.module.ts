import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneFormatPipe } from './phoneformat.pipe'; 

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhoneFormatPipe],
  exports: [PhoneFormatPipe]
})
export class PhoneFormatModule {}
