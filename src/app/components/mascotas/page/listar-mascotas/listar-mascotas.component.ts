import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../interfaces/mascotas';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.scss'
})
export class ListarMascotasComponent {
  mascotas: Mascota[] = []; // Inicializada como un arreglo vacío

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas(): void {
    this.mascotasService.listaMascotas()
      .subscribe(mascotas => {
        console.log(mascotas);
        this.mascotas = mascotas;
      });
  }
}
