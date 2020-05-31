import { Component, OnInit } from '@angular/core';
import {ModelContact} from "../model/model.contact";
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  contact: any = new ModelContact();

  constructor(public contactService:ContactsService, public router:Router) { }

  ngOnInit(): void {
  }

  saveContact() {
   this.contactService.saveContact(this.contact)
      .subscribe(data=>{
        this.contact=data;
        this.router.navigateByUrl('/contacts/'+this.contact.id);
      },err=>{
        console.log(err);
      });
  }
}
