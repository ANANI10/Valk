import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'src/app/Services/employe.service';
import { Employe } from 'src/models/Employe.models';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit{

  employeForm !: FormGroup 
  listEmploye : any[] = [];
  successMessage: string | null = null;
  searchValue: string = '';
  
  constructor(private employeService : EmployeService , private formBuilder : FormBuilder){
    
    this.employeForm = this.formBuilder.group({
      // Peut-être à remplir automatiquement ou à sélectionner
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      date_Embauche: ['', [Validators.required]],
      pays: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      salaireBase: [null, [Validators.required]],
      prime: [0, [Validators.required]],
    });
    
  }

  africaCountries = [
    
      { id: 1, name: 'Algérie' },
      { id: 2, name: 'Angola' },
      { id: 3, name: 'Bénin' },
      { id: 4, name: 'Botswana' },
      { id: 5, name: 'Burkina Faso' },
      { id: 6, name: 'Burundi' },
      { id: 7, name: 'Cameroun' },
      { id: 8, name: 'Cap-Vert' },
      { id: 9, name: 'République centrafricaine' },
      { id: 10, name: 'Tchad' },
      { id: 11, name: 'Comores' },
      { id: 12, name: 'République démocratique du Congo' },
      { id: 13, name: 'Djibouti' },
      { id: 14, name: 'Égypte' },
      { id: 15, name: 'Guinée équatoriale' },
      { id: 16, name: 'Érythrée' },
      { id: 17, name: 'Éthiopie' },
      { id: 18, name: 'Gabon' },
      { id: 19, name: 'Gambie' },
      { id: 20, name: 'Ghana' },
      { id: 21, name: 'Guinée' },
      { id: 22, name: 'Guinée-Bissau' },
      { id: 23, name: 'Côte d\'Ivoire' },
      { id: 24, name: 'Kenya' },
      { id: 25, name: 'Lesotho' },
      { id: 26, name: 'Libéria' },
      { id: 27, name: 'Libye' },
      { id: 28, name: 'Madagascar' },
      { id: 29, name: 'Malawi' },
      { id: 30, name: 'Mali' },
      { id: 31, name: 'Mauritanie' },
      { id: 32, name: 'Maurice' },
      { id: 33, name: 'Maroc' },
      { id: 34, name: 'Mozambique' },
      { id: 35, name: 'Namibie' },
      { id: 36, name: 'Niger' },
      { id: 37, name: 'Nigeria' },
      { id: 38, name: 'Rwanda' },
      { id: 39, name: 'Sao Tomé-et-Principe' },
      { id: 40, name: 'Sénégal' },
      { id: 41, name: 'Seychelles' },
      { id: 42, name: 'Sierra Leone' },
      { id: 43, name: 'Somalie' },
      { id: 44, name: 'Afrique du Sud' },
      { id: 45, name: 'Soudan' },
      { id: 46, name: 'Soudan du Sud' },
      { id: 47, name: 'Swaziland' },
      { id: 48, name: 'Tanzanie' },
      { id: 49, name: 'Togo' },
      { id: 50, name: 'Tunisie' },
      { id: 51, name: 'Ouganda' },
      { id: 52, name: 'Zambie' },
      { id: 53, name: 'Zimbabwe' }
    
  ];

  Genre = [
    { id : 1 , name : 'M'},
    { id : 2 , name : 'F'}
    
  ];

  ngOnInit(): void {
    this.fetchAllEmploye();
    
  }
  
  onAddEmploye(): void {
    console.log('Méthode onAddEmploye appelée');
  
    if (this.employeForm.valid) {
      console.log('Formulaire Validé');
      console.log(this.employeForm.valid);
      const employeData = this.employeForm.value;
      this.employeService.addEmployee(employeData).subscribe(
        employe => {
          this.listEmploye.push(employe);
          this.employeForm.reset();
          this.successMessage = 'L\'n employé a été enregistré avec succès.';
          // Effacer le message de succès après quelques secondes si nécessaire
          setTimeout(() => this.successMessage = null, 5000);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de l\'n employe', error);
          // Gérer les erreurs en conséquence, afficher un message d'erreur si nécessaire
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  
}

fetchAllEmploye():void{
  this.employeService.listEmploye().subscribe({
    next:(response)=>{
      console.log(response);
      this.listEmploye = response;
    },
    error(err){
      console.log("Erreur de chargement" , err);
    },
  })
}

onDeleteProduit(employeId:number):void{
  console.log(employeId);
  this.employeService.deleteEmploye(employeId).subscribe({
    next:(response)=>{
      console.log(response);
      this.fetchAllEmploye();
    },
    error(err){
      console.log('erreur de suppression' , err)
    },
  })
}

onDeleteEmployeConfirmation(employeId: number): void {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet employe ?");
  if (confirmation) {
    this.listEmploye = this.listEmploye.filter(employe => employe.employeId !== employeId);
    this.employeService.deleteEmploye(employeId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log('erreur de suppression', err);
       
      },
    });
  }
}

get filteredEmploye(): Employe[] {
  return this.listEmploye.filter(employe => {
    return (
      //employe.employeId.toString().includes(this.searchValue) ||
      employe.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.prenom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.genre.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.email.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.date_Embauche.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.pays.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.ville.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.salaireBase.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      employe.prime.toLowerCase().includes(this.searchValue.toLowerCase()) 
    );
  });
}


}

