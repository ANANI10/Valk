import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './Components/categorie/categorie.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProduitComponent } from './Components/produit/produit.component';
import { VenteComponent } from './Components/vente/vente.component';
import { RevenueComponent } from './Components/revenue/revenue.component';
import { ApprovisionnementComponent } from './Components/approvisionnement/approvisionnement.component';
import { EmployeComponent } from './Components/employe/employe.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DiagrammeComponent } from './Components/diagramme/diagramme.component';

const routes: Routes = [

  //{path:'categorie' , component: CategorieComponent },
  //{path:'produits' , component: ProduitComponent},

  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},

 
  {path:'dashboard'  , component:DashboardComponent , children :[
    {path:'categorie' , component: CategorieComponent },
    {path:'produits' , component: ProduitComponent},
    {path:'vente' , component: VenteComponent },
    {path:'revenu-total' , component: RevenueComponent },
    {path:'approvisionnement' , component: ApprovisionnementComponent },
    {path:'emplo' , component: EmployeComponent},
    {path:'journalier' , component: DiagrammeComponent},
    {path:'register' , component: RegisterComponent}
  ]
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
