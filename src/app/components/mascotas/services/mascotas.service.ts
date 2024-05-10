import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Mascota } from '../interfaces/mascotas';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private apiURL: String = environment.apiWSMascotas;

  constructor(private http: HttpClient) { }

  listaMascotas(): Observable<Mascota[]> {
    const url = `${this.apiURL}/ListaMacotas`;
    return this.http.get<Mascota[]>(url);
  }

  registrarMascota(mascota: Mascota): Observable<any> {
    const url = `${this.apiURL}/RegristrarMascota`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, mascota, httpOptions);
  }

  buscarMascotaPorId(id: number): Observable<any> {
    const url = `${this.apiURL}/BuscarMascota/${id}`;
    return this.http.get<any>(url);
  }

  editarMascota(idMascota: number, mascotaActualizada: Mascota): Observable<any> {
    const url = `${this.apiURL}/EditarMascota/${idMascota}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(url, mascotaActualizada, httpOptions);
  }

  eliminarMascota(idMascota: number): Observable<any> {
    const url = `${this.apiURL}/EliminarMascota/${idMascota}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}
