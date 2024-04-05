import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Approvisionnement } from 'src/models/Approvisionnement.models';
import { Produit } from 'src/models/Produit.models';

@Injectable({
  providedIn: 'root'
})
export class ApprovisionnementService {

  constructor(private http : HttpClient) { }

  addApprovisionnement(approvisionnement : Approvisionnement, produitId : number ):Observable<Approvisionnement>{
    console.log('Données d\'approvisionnement à envoyer:', approvisionnement);
    return this.http.post<Approvisionnement>(`${environment.backendhost}/ajouter/${produitId}` , approvisionnement)
  }

  listApprovisionement():Observable<Approvisionnement[]>{
    return this.http.get<Approvisionnement[]>(`${environment.backendhost}/afficherListeAppro`)
  }

  getApproPage(page: number): Observable<any> {
    return this.http.get<any>(`${environment.backendhost}/list?page=${2}`);
  }

  getProduitDetails(approId: number): Observable<Produit> {
    return this.http.get<Produit>(`${environment.backendhost}/getProduitDetails/${approId}`);
  }


 /* updateApprovisionnement(approId:number , appro : Approvisionnement):Observable<Approvisionnement>{
    return this.http.put<Approvisionnement>(`${environment.backendhost}/update/${approId}`, appro)
  }

  deleteApprovisionement(approId : number):Observable<Approvisionnement>{
    return this.http.delete<Approvisionnement>(`${environment.backendhost}` )
  }*/

}
