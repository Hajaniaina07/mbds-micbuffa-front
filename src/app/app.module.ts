import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

import {AssignmentsComponent} from './assignments/assignments.component';
import {RenduDirective} from './shared/rendu.directive';
import {NonRenduDirective} from './shared/non-rendu.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AssignmentDetailComponent} from './assignments/assignment-detail/assignment-detail.component';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';

import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {EditAssignmentComponent} from './assignments/edit-assignment/edit-assignment.component';
import {AuthGuard} from './shared/auth.guard';
import {LoginComponent} from './users/login/login.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UtilisateurComponent} from './users/utilisateur/utilisateur.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatieresComponent} from './matieres/matieres.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {NgpImagePickerModule} from "ngp-image-picker";
import {MatDialogModule} from "@angular/material/dialog";
import { ProgressComponent } from './base/progress/progress.component';
import { DetailComponent } from './users/detail/detail.component';
import { DetailMatiereComponent } from './matieres/detail-matiere/detail-matiere.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";

const routes: Routes = [
  {path: "", component: AcceuilComponent},
  {path: "accueuil", component: AcceuilComponent},
  {path: "login", component: LoginComponent},
  {path: "assignments", component: AssignmentsComponent},
  {path: "add", component: AddAssignmentComponent},
  {path: "assignment/:id", component: AssignmentDetailComponent},
  {path: "assignment/:id/edit", component: EditAssignmentComponent, canActivate: [AuthGuard]},
  {path: "users", component: UtilisateurComponent},
  {path: "matières", component: MatieresComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    UtilisateurComponent,
    MatieresComponent,
    AcceuilComponent,
    ProgressComponent,
    DetailComponent,
    DetailMatiereComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, MatSnackBarModule,
    BrowserAnimationsModule, FlexLayoutModule, MatDividerModule, MatDialogModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCheckboxModule, RouterModule.forRoot(routes), HttpClientModule, ScrollingModule,
    MatToolbarModule, MatInputModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatSlideToggleModule,
    MatSelectModule, MatOptionModule, MatTabsModule, NgpImagePickerModule, MatStepperModule, MatAutocompleteModule, AngularMultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
