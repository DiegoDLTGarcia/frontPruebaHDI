import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas-routing.module';
import { ListarMascotasComponent } from './page/listar-mascotas/listar-mascotas.component';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ListarMascotasComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MascotasRoutingModule,
    TreeTableModule,
    TableModule,
    ButtonModule
  ]
})
export class MascotasModule { }
