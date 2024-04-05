import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategorieComponent } from './Components/categorie/categorie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProduitComponent } from './Components/produit/produit.component';
import { VenteComponent } from './Components/vente/vente.component';
import { RevenueComponent } from './Components/revenue/revenue.component';
import { ApprovisionnementComponent } from './Components/approvisionnement/approvisionnement.component';
import { CommonModule } from '@angular/common';
import { NbreEmployeComponent } from './Components/nbre-employe/nbre-employe.component';
import { EmployeComponent } from './Components/employe/employe.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './Components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './Components/register/register.component';
import { NombreCategorieComponent } from './Components/nombre-categorie/nombre-categorie.component';
import { DiagrammeComponent } from './Components/diagramme/diagramme.component';
import { NgChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    DashboardComponent,
    ProduitComponent,
    VenteComponent,
    RevenueComponent,
    ApprovisionnementComponent,
    NbreEmployeComponent,
    EmployeComponent,
    LoginComponent,
    RegisterComponent,
    NombreCategorieComponent,
    DiagrammeComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    DatePipe,
    MatIconModule,
    NgChartsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
