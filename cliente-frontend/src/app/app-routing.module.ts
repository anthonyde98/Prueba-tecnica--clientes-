import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clientes/listado"',
    redirectTo: "clientes/listado",
    pathMatch: 'full'
  },
  {
    path: "clientes/listado",
    loadChildren: () => import('./pages/listado/listado.module').then(m => m.ListadoModule)
  },
  {
    path: 'clientes/detalles/:id',
    loadChildren: () => import('./pages/detalles/detalles.module').then(m => m.DetallesModule)
  },
  {
    path: 'clientes/establecer',
    loadChildren: () => import('./pages/establecer/establecer.module').then(m => m.EstablecerModule)
  },
  {
    path: '**',
    redirectTo: "clientes/listado",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
