import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategorieService } from 'src/app/Services/categorie.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { Produit } from 'src/models/Produit.models';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{
  categories: any;
  responseMessage: any;


  ngOnInit(): void {
    this.fetchAllProduit();
    this.getCategories();
  }

  produit : Produit | any ; 
  produitForm!: FormGroup; 
  listeProduit : any[] = [];
  searchValue: string = '';
  
   // Dans la classe AddEmployeComponent
   successMessage: string | null = null;

   constructor(private produitService : ProduitService,private categorieService : CategorieService , private formBuilder: FormBuilder , public dialog: MatDialog) {
     this.produitForm = this.formBuilder.group({
       nom: ['', [Validators.required]],
       description: ['', [Validators.required]],
       quantiteStock: [0, [Validators.required]],
       categorieId : ['' , [Validators.required]],
       prix: ['', [Validators.required]],
       dateStock: ['', [Validators.required]],
      
     });
   }

   getCategories(){
    this.categorieService.listCategorie().subscribe((response:any)=>{
      this.categories = response ; 
    },(error : any)=>{
      console.log("Erreur de chargement des catégories", error);
    })
   }
   
   onAddProduit(): void {
    console.log('Méthode onAddProduit appelée');
  
    if (this.produitForm.valid) {
      console.log('Formulaire Validé');
      console.log(this.produitForm.valid);
  
      // Vérifier si categorieId est null, utiliser une valeur par défaut si nécessaire
      const categorieId = this.produitForm.value.categorieId || /* Valeur par défaut */ 1;
  
      const produitData = {
        ...this.produitForm.value,
        categorieId: categorieId,
      };
  
      this.produitService.addProduit(produitData , categorieId).subscribe(
        produit => {
          this.listeProduit.push(produit);
          this.produitForm.reset();
          this.successMessage = 'Le produit a été enregistré avec succès.';
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
  

   /*onAddProduit(): void {
    console.log('Méthode onAddProduit appelée');
  
    if (this.produitForm.valid) {
      console.log('Formulaire Validé');
      console.log(this.produitForm.valid);
      const produitData = this.produitForm.value;
      this.produitService.addProduit(produitData).subscribe(
        produit => {
          this.listeProduit.push(produit);
          this.produitForm.reset();
          this.successMessage = 'Le produit a été enregistré avec succès.';
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
  }*/

  fetchAllProduit():void{
    this.produitService.listProduit().subscribe({
      next:(response)=>{
        console.log(response);
        this.listeProduit = response;
      },
      error(err){
        console.log("Erreur de chargement" , err);
      },
    })
  }


  onDeleteCategorie(id:number):void{
    console.log(id);
    this.produitService.deleteProduit(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.fetchAllProduit();
      },
      error(err){
        console.log('erreur de suppression' , err)
      },
    })
  }

  onUpdateProduit(id:number , produit : Produit):void{
    this.produitService.updateProduit(id , produit).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error(err){
        console.log("erreur de mise à jours" , err);
      }
    })
  }


  onDeleteProduitConfirmation(id: number): void {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir la supprimer ?");
    if (confirmation) {
      // Supprimer l'employé de la liste localement avant d'appeler le service
      this.listeProduit = this.listeProduit.filter(produit => produit.id !== id);
  
      // Appeler le service de suppression
      this.produitService.deleteProduit(id).subscribe({
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

  get filteredProduit(): Produit[] {
    return this.listeProduit.filter(produit => {
      return (
        produit.id.toString().includes(this.searchValue) ||
        produit.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        produit.description.toString().includes(this.searchValue) ||
        produit.quantiteStock.toString().includes(this.searchValue) ||
        produit.prix.toString().includes(this.searchValue) ||
        produit.dateStock.toString().includes(this.searchValue)
      );
    });
  }

  

}
