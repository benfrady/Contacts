import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";
import {ModelContact} from "../model/model.contact";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactId: number;
  contact:any=new ModelContact();
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactsService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.contactId = +this.activatedRoute.snapshot.params.id;
    this.contactService.getContactByID(this.contactId)
      .subscribe(data => this.contact = data);

  }

  updateContact() {
    this.contactService.updateContact(this.contactId, this.contact)
      .subscribe(data=>{
        this.router.navigateByUrl('/contacts/' + this.contact.id);
        },
  err => {
  console.log(err);
}
  )
  }
}
