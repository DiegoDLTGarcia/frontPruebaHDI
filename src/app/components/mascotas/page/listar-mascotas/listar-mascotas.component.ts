import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../interfaces/mascotas';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.scss']
})
export class ListarMascotasComponent implements OnInit {
  mascotas: Mascota[] = [];
  mascota: Mascota | null = null;
  editarVisible = false;
  agregarVisible = false;
  eliminarVisible = false;
  formulario!: FormGroup;

  constructor(
    private mascotasService: MascotasService,
    private router: Router,private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMascotas();

    this.formulario = this.fb.group({
      idPropietario: ['', Validators.required],
      nombre: ['', Validators.required],
      idRaza: ['', Validators.required],
      edad: ['', Validators.required]
    });
  }

  getMascotas(): void {
    this.mascotasService.listaMascotas()
      .subscribe(
        mascotas => this.mascotas = mascotas,
        error => this.mostrarAlerta('Error al obtener mascotas: ' + error.message, 3000)
      );
  }

  agregarMascota(): void {
    this.mascota = {} as Mascota;
    this.agregarVisible = true;
  }

  guardarNuevaMascota(): void {
    if (this.formulario.valid) {
      const mascota = this.formulario.value;
      this.mascotasService.registrarMascota(mascota)
        .subscribe(
          () => {
            alert('Mascota agregada correctamente');
            this.agregarVisible = false;
            this.getMascotas();
            this.formulario.reset();
          },
          error => this.mostrarAlerta('Error al agregar mascota: ' + error.message, 3000)
        );
    } else {
    }
  }

  editarMascota(idMascota: number): void {
    this.mascotasService.buscarMascotaPorId(idMascota).subscribe(
      response => {
        if (response.mensaje === 'ok') {
          this.mascota = response.response;
          this.editarVisible = true;
        } else {
          this.mostrarAlerta('No se encontró la mascota con el ID especificado', 3000);
        }
      },
      error => this.mostrarAlerta('Error al buscar la mascota: ' + error.message, 3000)
    );
  }

  guardarCambios(): void {
    // Implementa la lógica para guardar los cambios de la mascota editada
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
        error => this.mostrarAlerta('Error al eliminar mascota: ' + error.message, 3000)
      );
  }

  mostrarAlerta(mensaje: string, duracion: number): void {
    // Implementa la lógica para mostrar alertas de manera más elegante
    console.error(mensaje);
  }
}
