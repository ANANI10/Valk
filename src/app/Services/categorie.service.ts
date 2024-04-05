import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from 'src/models/Categorie.models';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Produit } from 'src/models/Produit.models';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http : HttpClient) { }

  listCategorie():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(`${environment.backendhost}/listeCategorie`)
  }

  addCategorie(categorie:Categorie):Observable<Categorie>{
    return this.http.post<Categorie>(`${environment.backendhost}/ajouterCategorie` , categorie)
  }

  updateCategorie(categorieId:number , categorie:Categorie):Observable<Categorie>{
    return this.http.put<Categorie>(`${environment.backendhost}/update/${categorieId}`, categorie)
  }

  deleteCategorie(categorieId : number):Observable<Categorie>{
    return this.http.delete<Categorie>(`${environment.backendhost}/delete/categorie/${categorieId}`)
  }


  getCategorieById(categorieId: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${environment.backendhost}/categorieById/${categorieId}`);
  }

  getProduitsByCategorie(categorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${environment.backendhost}/categorie/${categorieId}/produits`);

  }


  getCategoriePage(page: number): Observable<any> {
    return this.http.get<any>(`${environment.backendhost}/list?page=${2}`);
  }

  calculerNombreTotalCategorie(): Observable<number> {
    return this.http.get<number>(`${environment.backendhost}/nombreCategorie`);
  }




}
