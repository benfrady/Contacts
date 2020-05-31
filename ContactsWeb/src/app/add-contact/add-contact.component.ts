import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {ModelContact} from "../model/model.contact";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  contact: any;
  mode=1;
  constructor(public contactService:ContactsService, public router:Router) { }

  ngOnInit(): void {
  }

  onSaveContact(value: any) {
    this.contactService.saveContact(value)
      .subscribe(data=>{
        this.contact=data;
        this.router.navigateByUrl('/contacts/'+this.contact.id);
      },err=>{
        console.log(JSON.parse(err._body).messsage);
      });
  }
}
