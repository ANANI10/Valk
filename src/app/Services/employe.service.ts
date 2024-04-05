import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Employe } from 'src/models/Employe.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  addEmployee(employe : Employe):Observable<Employe>{
    return this.http.post<Employe>(`${environment.backendhost}/ajouterEmploye` , employe)
  }

  listEmploye() : Observable<Employe[]>{
    return this.http.get<Employe[]>(`${environment.backendhost}/listeEmploye`)
  }

  updateEmploye(employe : Employe , employeId : number) : Observable<Employe>{
    return this.http.put<Employe>(`${environment.backendhost}/update/${employeId}` , employe)
  }

  deleteEmploye(employeId : number) : Observable<Employe>{
    return this.http.delete<Employe>(`${environment.backendhost}/deleteEmploye/${employeId}`)
  }


}
