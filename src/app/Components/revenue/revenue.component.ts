import { Component, OnInit } from '@angular/core';
import { VenteService } from 'src/app/Services/vente.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit{
  sommeRevenuTotal !: number;

  constructor(private venteService : VenteService){}
  ngOnInit(): void {
    this.calculerSommeRevenuTotal()
  }

  
  calculerSommeRevenuTotal() {
    this.venteService.calculerSommeRevenuTotal().subscribe(
      (result: number) => {
        this.sommeRevenuTotal = result;
      },
      error => {
        console.error('Erreur lors de la récupération de la somme du revenu total : ', error);
      }
    );
  }

}
