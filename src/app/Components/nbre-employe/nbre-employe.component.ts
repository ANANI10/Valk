import { Component, OnInit } from '@angular/core';
import { NbreEmployeService } from 'src/app/Services/nbre-employe.service';

@Component({
  selector: 'app-nbre-employe',
  templateUrl: './nbre-employe.component.html',
  styleUrls: ['./nbre-employe.component.css']
})
export class NbreEmployeComponent implements OnInit{

  constructor(private nbreEmployeService : NbreEmployeService){}
  nombreEmployeTotal !: number;
 

  ngOnInit(): void {
    this.calculerNombreEmployee()
  }


  calculerNombreEmployee() {
    this.nbreEmployeService.calculerNombreTotalEmploye().subscribe(
      (result: number) => {
        this.nombreEmployeTotal = result;
      },

      (error:any) => {
        console.error('Erreur lors de la récupération de la somme du revenu total : ', error);
      }
    );
  }
}
