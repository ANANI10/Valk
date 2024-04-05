import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NbreEmployeService {

  constructor(private http : HttpClient) { }

  calculerNombreTotalEmploye(): Observable<number> {
    return this.http.get<number>(`${environment.backendhost}/nombresEmployes`);
  }
}
