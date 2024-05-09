import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../interfaces/mascotas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrl: './listar-mascotas.component.scss'
})
export class ListarMascotasComponent {
  mascotas: Mascota[] = []; 
  editarVisible: boolean = false;
  eliminarVisible: boolean = false;
  mascota!: Mascota;

  constructor(private mascotasService: MascotasService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas(): void {
    this.mascotasService.listaMascotas()
      .subscribe(mascotas => {
        this.mascotas = mascotas;
      });
  }

  agregarMascota(): void {
    console.log('add mascota con ID:');
  }

  editarMascota(idMascota: number): void {
    this.mascotasService.buscarMascotaPorId(idMascota).subscribe(
      response => {
        if (response.mensaje === 'ok') {
          const mascotaEncontrada: Mascota = response.response;
          this.mascota = mascotaEncontrada;
          this.editarVisible = true;
        } else {
          this.mostrarAlerta('No se encontró la mascota con el ID especificado', 3000);
        }
      },
      error => {
        this.mostrarAlerta('Error al buscar la mascota: ' + JSON.stringify(error), 3000);
      }
    );
  }
  
  mostrarAlerta(mensaje: string, duracion: number): void {
    alert(mensaje);
    setTimeout(() => {
      // Ocultar la alerta después de la duración especificada
      const alerta = document.querySelector('.alert');
      if (alerta) {
        alerta.remove();
      }
    }, duracion);
  }

  guardarCambios() {
 }

  eliminarMascota(id: number): void {
    this.eliminarVisible = true;
  }

  borrarMascota(idMascota: number): void {
    this.mascotasService.eliminarMascota(idMascota)
    .subscribe(
      () => {
        alert('Mascota eliminada correctamente');
        this.eliminarVisible = false;
        this.getMascotas();
      },
      error => {
        alert('Error al eliminar mascota: ' + error.message);
        console.error('Error al eliminar mascota:', error);
      }
    );
  }


  showDialogEdit() {
    this.editarVisible = true;
}

showDialogDelete() {
  this.eliminarVisible = true; 
}
}
