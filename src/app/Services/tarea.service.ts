import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../Interfaces/tarea';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl: string = environment.endPoint + 'Tarea/';

  constructor(private http: HttpClient) { }

  getList(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}Lista`);
  }

  add(request: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.apiUrl}Agregar`, request);
  }

  delete(idTarea: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Eliminar/${idTarea}`);
  }
}
