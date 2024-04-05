import { Component } from '@angular/core';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-nombre-categorie',
  templateUrl: './nombre-categorie.component.html',
  styleUrls: ['./nombre-categorie.component.css']
})
export class NombreCategorieComponent {

  constructor(private categorieService : CategorieService){}
  nombreCategorieTotal !: number;
 

  ngOnInit(): void {
    this.calculerNombreCategorie()
  }


  calculerNombreCategorie() {
    this.categorieService.calculerNombreTotalCategorie().subscribe(
      (result: number) => {
        this.nombreCategorieTotal = result;
      },

      (error:any) => {
        console.error('Erreur lors de la récupération de la somme du revenu total : ', error);
      }
    );
  }

}
