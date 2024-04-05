import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/Services/categorie.service';
import { Categorie } from 'src/models/Categorie.models';
//import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ProduitService } from 'src/app/Services/produit.service';
import { Produit } from 'src/models/Produit.models';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{

  categorie : Categorie | any ; 
  categorieForm!: FormGroup; 
  listeCategorie : any[] = [];
  searchValue: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  totalLength : any;
  page!: number;
  term !: string;
  
   // Dans la classe AddEmployeComponent
   successMessage: string | null = null;

   constructor(private categorieService : CategorieService, private produitService : ProduitService ,  private formBuilder: FormBuilder , public dialog: MatDialog) {
     this.categorieForm = this.formBuilder.group({
       nomCategorie: ['', [Validators.required]],
       description: ['', [Validators.required]],
      
     });
   }
  ngOnInit(): void {
    this.fetchAllCategorie();
  }

   

   onAddCategorie(): void {
    console.log('Méthode onAddCategorie appelée');
  
    if (this.categorieForm.valid) {
      console.log('Formulaire Validé');
      console.log(this.categorieForm.valid);
      const categorieData = this.categorieForm.value;
      this.categorieService.addCategorie(categorieData).subscribe(
        categorie => {
          this.listeCategorie.push(categorie);
          this.categorieForm.reset();
          this.successMessage = 'La categorie a été enregistré avec succès.';
          // Effacer le message de succès après quelques secondes si nécessaire
          setTimeout(() => this.successMessage = null, 5000);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de la categorie', error);
          // Gérer les erreurs en conséquence, afficher un message d'erreur si nécessaire
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  fetchAllCategorie():void{
    this.categorieService.listCategorie().subscribe({
      next:(response)=>{
        console.log(response);
        this.listeCategorie = response;
      },
      error(err){
        console.log("Erreur de chargement" , err);
      },
    })
  }


  onDeleteCategorie(categorieId:number):void{
    console.log(categorieId);
    this.categorieService.deleteCategorie(categorieId).subscribe({
      next:(response)=>{
        console.log(response);
        this.fetchAllCategorie();
      },
      error(err){
        console.log('erreur de suppression' , err)
      },
    })
  }

  onUpdateCategorie(categorieId:number , categorie:Categorie):void{
    this.categorieService.updateCategorie(categorieId , categorie).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error(err){
        console.log("erreur de mise à jours" , err);
      }
    })
  }


  onDeleteCategorieConfirmation(categorieId: number): void {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir la supprimer ?");
    if (confirmation) {
      // Supprimer l'employé de la liste localement avant d'appeler le service
      this.listeCategorie = this.listeCategorie.filter(categorie => categorie.categorieId !== categorieId);
  
      // Appeler le service de suppression
      this.categorieService.deleteCategorie(categorieId).subscribe({
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

  get filteredCategorie(): Categorie[] {
    return this.listeCategorie.filter(categorie => {
      return (
        categorie.categorieId.toString().includes(this.searchValue) ||
        categorie.nomCategorie.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        categorie.description.toString().includes(this.searchValue)
      );
    });
  }

 // Déclarez une variable pour stocker les produits de la catégorie sélectionnée
produitsDeLaCategorie: Produit[] = [];
categorieSelectionnee: Categorie | null = null;

// Ajoutez cette méthode dans votre classe
afficherProduitsParCategorie(categorieId: number): void {
  // Appelez le service pour récupérer les produits associés à la catégorie
  this.produitService.getProduitsByCategorie(categorieId).subscribe(
    (produits) => {
      // Mettez à jour la variable pour afficher les produits dans le tableau
      this.produitsDeLaCategorie = produits;
      // Mettez à jour la catégorie sélectionnée pour afficher le titre
      this.categorieService.getCategorieById(categorieId).subscribe(
        (categorie) => {
          this.categorieSelectionnee = categorie;
        },
        (error) => {
          console.error("Erreur lors de la récupération de la catégorie", error);
        }
      );
    },
    (error) => {
      console.error("Erreur lors de la récupération des produits", error);
    }
  );
}

fetchCategoriePage(page: number): void {
  this.categorieService.getCategoriePage(page).subscribe({
    next: (data: any) => {
      this.listeCategorie = data.results; // Stockez les données paginées
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des données :', err);
    },
  });
}


getPagedCategorie(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.listeCategorie.slice(startIndex, endIndex);
}

onPageChange(page: number) {
  this.fetchCategoriePage(page);
}

getPageNumbers(): number[] {
  const totalItems = this.listeCategorie.length;
  const totalPages = Math.ceil(totalItems / this.itemsPerPage);
  return Array(totalPages).fill(0).map((x, i) => i + 1);
}





}
