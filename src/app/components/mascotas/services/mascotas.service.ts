import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Mascota } from '../interfaces/mascotas';



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
}
