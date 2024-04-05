import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Vente } from 'src/models/Vente.models';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  constructor(private http : HttpClient) { }

  listeVente():Observable<Vente[]>{
    return this.http.get<Vente[]>(`${environment.backendhost}/listeVente`)
  }

  addVente(vente : Vente, produitId : number ):Observable<Vente>{
    console.log('URL:', `${environment.backendhost}/produit/${produitId}/ajouterVente`);
    console.log('Data:', vente);
    return this.http.post<Vente>(`${environment.backendhost}/produit/${produitId}/ajouterVente` , vente)
  }

  updateVente(venteId:number , vente : Vente):Observable<Vente>{
    return this.http.put<Vente>(`${environment.backendhost}/updateVente/${venteId}`, vente)
  }

  deleteVente(venteId : number):Observable<Vente>{
    return this.http.delete<Vente>(`${environment.backendhost}/delete/${venteId}`)
  }


  calculerSommeRevenuTotal(): Observable<number> {
    return this.http.get<number>(`${environment.backendhost}/revenu-total`);
  }

  getVentesParJour(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendhost}/ventes-par-jour`);
  }

  getProductDetails(venteId: string): Observable<any> {
    return this.http.get<any[]>(`${environment.backendhost}/${venteId}/details`);
  }


}
