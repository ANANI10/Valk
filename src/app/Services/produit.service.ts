import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Produit } from 'src/models/Produit.models';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  listProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>(`${environment.backendhost}/listeProduit`)
  }

  addProduit(produit : Produit, categorieId : number ):Observable<Produit>{
    return this.http.post<Produit>(`${environment.backendhost}/categorie/${categorieId}/ajouterProduit` , produit)
  }

  updateProduit(id:number , produit : Produit):Observable<Produit>{
    return this.http.put<Produit>(`${environment.backendhost}/updateProduit/${id}`, produit)
  }

  deleteProduit(id : number):Observable<Produit>{
    return this.http.delete<Produit>(`${environment.backendhost}/delete/produit/${id}`)
  }


  /*getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${environment.backendhost}/produits/${id}`);
  }*/

  stockDisponible():Observable<number>{
    return this.http.get<number>(`${environment.backendhost}/stockdisponible`)
  }

  getProduitsByCategorie(categorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${environment.backendhost}/categorie/${categorieId}/produits`);
}

updateQuantiteStock(produitId: number, nouvelleQuantite: number):Observable<any>{
  return this.http.patch(`${environment.backendhost}/${produitId}/update-quantite` , nouvelleQuantite);
}

getAllProductIds(): Observable<number[]> {
  return this.http.get<number[]>(`${environment.backendhost}/allIds`);
}




}
