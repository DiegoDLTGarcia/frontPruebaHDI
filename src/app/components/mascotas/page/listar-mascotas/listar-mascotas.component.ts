import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../interfaces/mascotas';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosMascota } from '../../interfaces/mascotas';

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

  guardarCambios(idMascota: number): void {
    const mascota = this.mascotas.find(m => m.idMascota === idMascota);
    
    if (mascota) { // Check if mascota is not undefined
      const datosMascota: DatosMascota = {
        IdPropietario: mascota.idPropietario,
        nombre: mascota.nombre,
        IdRaza: mascota.idRaza,
        edad: mascota.edad
      };
      console.log(datosMascota);
      
  
      this.mascotasService.editarMascota(idMascota, datosMascota).subscribe(
        (respuesta: DatosMascota) => {
          console.log("Mascota actualizada con éxito", respuesta);
          this.editarVisible = false;
          this.getMascotas();
        },
        error => {
          console.error("Error al actualizar la mascota", error);
        }
      );
    } else {
      console.error("No se encontró la mascota con el ID proporcionado");
    }
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
