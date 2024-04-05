import { Produit } from "./Produit.models";

export interface Approvisionnement{
    approId : number;
    quantiteAjoutee : number;
    dateApprovisionnement : Date;
    produitDetails?: Produit;

}