import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMascotasComponent } from './components/mascotas/page/listar-mascotas/listar-mascotas.component';

const routes: Routes = [
  { path: 'listar', component: ListarMascotasComponent }, // Cambio realizado aquí
  { path: '**', redirectTo: 'listar' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
