import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NewContactComponent} from "./new-contact/new-contact.component";
import {AddContactComponent} from "./add-contact/add-contact.component";
import {EditContactComponent} from "./edit-contact/edit-contact.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: 'about', component:AboutComponent},
  {path: 'contacts', component:ContactsComponent},
  {path: 'newContact', component:NewContactComponent},
  {path: 'contacts/:id', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contacts/:nom/:id', component: EditContactComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
