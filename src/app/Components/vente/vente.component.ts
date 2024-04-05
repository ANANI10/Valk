import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProduitService } from 'src/app/Services/produit.service';
import { VenteService } from 'src/app/Services/vente.service';
import { Produit } from 'src/models/Produit.models';
import { Vente } from 'src/models/Vente.models';
//import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit{


  produits: any;
  responseMessage: any;
  ventesParJour: any[] = [];
  //lineChartData: ChartDataset[] = [{ data: [], label: 'Total des ventes par jour' }];
  lineChartLabels: string[] = [];
  selectedProduct: Produit | null = null;


  ngOnInit(): void {
    this.fetchAllVente();
    this.getProduit();
    this.venteService.getVentesParJour().subscribe((data) => {
      this.ventesParJour = data;
      //this.lineChartData[0].data = this.ventesParJour.map((vente) => vente.totalVente);
      this.lineChartLabels = this.ventesParJour.map((vente) => vente.dateVente);
    });

    /*this.produitService.getAllProductIds().subscribe(ids => {
      // ids contient la liste des IDs des produits
      // Utilisez ces IDs pour obtenir les détails de chaque produit
      //ids.forEach(id => this.showProductDetails(id));
    })*/;
  
  }

  vente : Vente | any ; 
  venteForm!: FormGroup; 
  listeVente : any[] = [];
  searchValue: string = '';

  /*lineChartOptions: ChartOptions = {
    responsive: true,
  };*/

  lineChartColors: any[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(173,216,230,0.2)',
    },
  ];
  
   // Dans la classe AddEmployeComponent
   successMessage: string | null = null;

   constructor(private venteService : VenteService ,private produitService : ProduitService , private formBuilder: FormBuilder , public dialog: MatDialog , private cdRef : ChangeDetectorRef) {
     this.venteForm = this.formBuilder.group({
       quantiteVente: ['', [Validators.required]],
       dateVente: ['', [Validators.required]],
       prixVente: [0, [Validators.required]],
       totalVente: [0, [Validators.required]],
       produitId : [ null , [Validators.required]]
      
     });
   }

   getProduit(){
    this.produitService.listProduit().subscribe((response:any)=>{
      this.produits = response ; 
    },(error : any)=>{
      console.log("Erreur de chargement des ventes", error);
    })
   }
   
   onAddVente(): void {
    console.log('Méthode onAddVente appelée');
  
    if (this.venteForm.valid) {
      console.log('Formulaire Validé');
      console.log(this.venteForm.valid);
  
      // Vérifier si categorieId est null, utiliser une valeur par défaut si nécessaire
      const produitId = this.venteForm.value.produitId;
      console.log('produitId:', produitId);

    
      const venteData = {
        ...this.venteForm.value,
        produitId: produitId,
        //produitId: produitId !== 'undefined' ? produitId : null,
      };

      this.venteService.addVente(venteData , produitId).subscribe(
        vente => {
          this.listeVente.push(vente);
          this.venteForm.reset();
          this.successMessage = 'La vente a été enregistré avec succès.';
          // Effacer le message de succès après quelques secondes si nécessaire
          setTimeout(() => this.successMessage = null, 5000);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement du produit', error);
          // Gérer les erreurs en conséquence, afficher un message d'erreur si nécessaire
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  /*onAddVente(): void {
    console.log('Méthode onAddVente appelée');
  
    if (this.venteForm.valid) {
      console.log('Formulaire Validé');
      console.log(this.venteForm.valid);
  
      const produitId = this.venteForm.value.produitId;
      const quantiteVente = this.venteForm.value.quantiteVente;
  
      // Vérifier si la quantité disponible est suffisante
      if (this.isQuantiteSuffisante(produitId, quantiteVente)) {
        // Effectuer la vente et mettre à jour la quantité disponible
        const venteData = { ...this.venteForm.value, produitId: produitId };
  
        this.venteService.addVente(venteData, produitId).subscribe(
          (vente) => {
            this.listeVente.push(vente);
            this.updateQuantiteStock(produitId, quantiteVente);
            this.venteForm.reset();
            this.successMessage = 'La vente a été enregistrée avec succès.';
            // Effacer le message de succès après quelques secondes si nécessaire
            setTimeout(() => this.successMessage = null, 5000);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de la vente', error);
          }
        );
      } else {
        console.log('Quantité insuffisante');
      }
    } else {
      console.log('Formulaire invalide');
    }
  }
  
  isQuantiteSuffisante(produitId: number, quantiteVente: number): boolean {
    const produit = this.produits.find((p: Produit) => p.id === produitId);
    return produit && produit.quantiteStock >= quantiteVente;
  }
  
  updateQuantiteStock(produitId: number, quantiteVente: number): void {
    const produit = this.produits.find((p: Produit) => p.id === produitId);
    if (produit) {
      produit.quantiteStock -= quantiteVente;
      // Mettre à jour la quantité disponible dans la base de données (appel à votre service de mise à jour)
      this.produitService.updateQuantiteStock(produitId, produit.quantiteStock).subscribe(
        () => {
          console.log('Quantité de stock mise à jour avec succès');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la quantité de stock', error);
          // Gérer les erreurs en conséquence
        }
      );
    }
  }*/
  

  updateTotalVente() {
    const quantiteVente = this.venteForm.get('quantiteVente')?.value || 0;
    const prixVente = this.venteForm.get('prixVente')?.value || 0;

    const totalVente = quantiteVente * prixVente;

    // Mettez à jour le champ totalVente dans le formulaire
    this.venteForm.patchValue({
      totalVente: totalVente
    });

    // Rafraîchissez la vue manuellement en utilisant le ChangeDetectorRef
    this.cdRef.detectChanges();
  }
  


  fetchAllVente():void{
    this.venteService.listeVente().subscribe({
      next:(response)=>{
        console.log(response);
        this.listeVente = response;
      },
      error(err){
        console.log("Erreur de chargement" , err);
      },
    })
  }


  onDeleteVente(venteId:number):void{
    console.log(venteId);
    this.venteService.deleteVente(venteId).subscribe({
      next:(response)=>{
        console.log(response);
        this.fetchAllVente();
      },
      error(err){
        console.log('erreur de suppression' , err)
      },
    })
  }

  onUpdateVente(venteId:number , vente : Vente):void{
    this.venteService.updateVente(venteId , vente).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error(err){
        console.log("erreur de mise à jours" , err);
      }
    })
  }


  onDeleteVenteConfirmation(venteId: number): void {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir la supprimer ?");
    if (confirmation) {
      // Supprimer l'employé de la liste localement avant d'appeler le service
      this.listeVente = this.listeVente.filter(vente => vente.venteId !== venteId);
  
      // Appeler le service de suppression
      this.venteService.deleteVente(venteId).subscribe({
        next: (response) => {
          console.log(response);
          // Pas besoin de faire quelque chose ici, car l'employé a déjà été supprimé localement
        },
        error: (err) => {
          console.log('erreur de suppression', err);
          // En cas d'erreur, vous pouvez envisager de restaurer l'employé dans la liste
          // this.fetchAllEmploye();
        },
      });
    }
  }

  get filteredVente(): Vente[] {
    return this.listeVente.filter(vente => {
      return (
        vente.venteId.toString().includes(this.searchValue) ||
        vente.quantiteVente.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        vente.dateVente.toString().includes(this.searchValue) ||
        vente.prixVente.toString().includes(this.searchValue)
      );
    });
  }

  currentProductId: number | undefined;


  /*showProductDetails(produitId: number): void {
    // Utilisez le service ProduitService pour obtenir les détails du produit par son ID
    this.currentProductId = produitId;
    this.produitService.getProduitById(produitId).subscribe((produit) => {
      
      this.selectedProduct = produit;
    });
  }*/

  /*showProductDetails(produitId: number): void {
    this.produitService.getAllProductIds().subscribe((produit) => {
      // Faites ce que vous devez faire avec le produit, par exemple, l'afficher dans le frontend
      console.log(produit);
    });
  }*/

  showProductDetails(venteId: string): void {
    this.venteService.getProductDetails(venteId)
      .subscribe((product) => {
        this.selectedProduct = product;
      });
  }


  diagramme : any[] = []

  fetchdiagrame():void{
    this.venteService.getVentesParJour().subscribe({
      next:(response)=>{
        console.log(response);
        this.diagramme = response;
      },
      error(err){
        console.log("Erreur de chargement" , err);
      },
    })
  }
  


}
