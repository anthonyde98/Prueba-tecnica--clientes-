import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablecerComponent } from './establecer.component';

const routes: Routes = [
  {
    path: '',
    component: EstablecerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecerRoutingModule { }
