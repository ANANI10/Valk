import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApprovisionnementService } from 'src/app/Services/approvisionnement.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { Approvisionnement } from 'src/models/Approvisionnement.models';
import { Produit } from 'src/models/Produit.models';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.css'],
  providers: [DatePipe],
})
export class ApprovisionnementComponent implements OnInit {


  produits: any
  approvisionnementForm: FormGroup;
  listeApprovisionnement: any[] = [];
  successMessage: string | null = null;
  searchValue: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  totalLength: any;
  page!: number;
  listAppro: any[] = [];
  listeProduit: Produit[] = [];

  constructor(private produitService: ProduitService, private approService: ApprovisionnementService, private formBuilder: FormBuilder, private datePipe: DatePipe) {

    this.approvisionnementForm = this.formBuilder.group({
      // Peut-être à remplir automatiquement ou à sélectionner
      quantiteAjoutee: [null, [Validators.required, Validators.min(1)]],
      dateApprovisionnement: ['', [Validators.required]],
      produitId: [null, [Validators.required]],
    });
    console.log(this.approvisionnementForm.get('produitId')?.errors);

  }

  ngOnInit(): void {
    this.listeAppro();
    this.getProduit();
  }
  onAddApprovisionnement(): void {
    if (this.approvisionnementForm.valid) {
      const produitId = this.approvisionnementForm.value.produitId;
      const dateValue = this.approvisionnementForm.value.dateApprovisionnement;

      // Formater la date au format "yyyy-MM-dd"
      const formattedDate = this.datePipe.transform(dateValue, 'yyyy-MM-dd');

      const approvisionnementData = {
        ...this.approvisionnementForm.value,
        dateApprovisionnement: formattedDate,
        produitId: produitId,

      };
    this.approService.addApprovisionnement(approvisionnementData, produitId).subscribe(
      response => {
        console.log(response);
        console.log('Approvisionnement réussi', response);
        if (response instanceof HttpResponse) {
          // Si la réponse est une instance de HttpResponse, c'est probablement une réponse texte brut.
          const successMessage = response.body; // Récupérez le texte brut
          console.log(successMessage);
          // Faites ce que vous devez faire avec le message de succès
        } else {
          // Sinon, essayez de traiter la réponse comme du JSON
          const appro = response as Approvisionnement; // Assurez-vous d'ajuster le type en fonction de votre modèle
          this.listeApprovisionnement.push(appro);
          this.approvisionnementForm.reset();
          // Gérez le succès comme nécessaire
          const produitIndex = this.listeProduit.findIndex(p => p.id === appro.approId);
          if (produitIndex !== -1) {
            this.listeProduit[produitIndex].quantiteStock += appro.quantiteAjoutee;
          }
          this.successMessage = 'Quantité ajoutée avec succès.';
          // Effacer le message de succès après quelques secondes si nécessaire
          setTimeout(() => this.successMessage = null, 5000);
          //this.showProduitDetails(appro.approId);
        }
      },
      error => {
        
        // Gérez les erreurs comme nécessaire
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            console.error('Erreur 400 - Demande invalide');
            // Gérez l'erreur 400 (Bad Request) de manière appropriée
          } else {
            
            if (error.status !== 200) {
              // Évitez de traiter le statut 200 comme une erreur
              console.error('Autre erreur HTTP:', error.status);
            }
            // Gérez d'autres codes d'erreur HTTP de manière appropriée
          }
        } else {
          console.error('Erreur inattendue:', error);
          // Gérez d'autres erreurs inattendues
        }
      }
      
    );
    
    }
    
    else {
      // Afficher les erreurs de validation dans la console
      Object.keys(this.approvisionnementForm.controls).forEach(key => {
        const controlErrors = this.approvisionnementForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error(`Key control: ${key}, keyError: ${keyError}, err value: ${controlErrors[keyError]}`);
          });
        }
      });

      console.log('Formulaire d\'approvisionnement invalide');
    }
  }

  /*listeAppro() {
    this.approService.listApprovisionement().subscribe({
      next: (response) => {
        console.log(response)
        this.listeApprovisionnement = response;
      },
      error(err) {
        console.log("erreur de chargement", err)
      }
    }
    )
  }*/

  listeAppro(): void {
    this.approService.listApprovisionement().subscribe({
      next: (approvisionnements: Approvisionnement[]) => {
        this.listeApprovisionnement = approvisionnements;

        // Récupérez les détails du produit pour chaque approvisionnement
        this.listeApprovisionnement.forEach(appro => {
          this.showProduitDetails(appro.approId , appro.produitId);
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la liste des approvisionnements', error);
      },
    });
  }


  showProduitDetails(approId: number, produitId: number): void {
    this.approService.getProduitDetails(produitId).subscribe(
      (produit: Produit) => {
        const appro = this.listeApprovisionnement.find(app => app.approId === approId && app.produitId === produitId);
        if (appro) {
          appro.produitDetails = produit;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des détails du produit', error);
      }
    );
  }

  

  getProduit() {
    this.produitService.listProduit().subscribe((response: any) => {
      this.produits = response;
    }, (error: any) => {
      console.log("Erreur de chargement des catégories", error);
    })
  }

  fetchApproPage(page: number): void {
    this.approService.getApproPage(page).subscribe({
      next: (data: any) => {
        this.listAppro = data.results; // Stockez les données paginées
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      },
    });
  }

  get filteredAppro(): Approvisionnement[] {
    return this.listAppro.filter(appro => {
      return (
        appro.approId.toString().includes(this.searchValue) ||
        appro.quantiteAjoutee.toString().includes(this.searchValue) ||
        appro.dateApprovisionnement.toString().includes(this.searchValue)
      );
    });
  }


  getPagedAppro(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAppro.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const totalItems = this.listAppro.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }


  // Dans votre composant



}
