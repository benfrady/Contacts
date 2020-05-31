import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModelContact} from "../model/model.contact";
import {computeStartOfLinePositions} from "@angular/compiler-cli/ngcc/src/sourcemaps/source_file";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  contactId: number;
  contact:any=new ModelContact();
  currentContact: any;
  editPhoto: boolean;
  private selectedFiles;
  progress: number;
  private currentFileUpload: any;
  private currentTime: number;
  constructor(
    private activatedRoute: ActivatedRoute, public contactService: ContactsService, public router:Router) { }

  ngOnInit() {
    this.contactId = +this.activatedRoute.snapshot.params.id;
    console.log(this.contactId);
    this.contactService.getContactByID(this.contactId)
      .subscribe(data => {
        this.contact = data;
        },
        err => {
          console.log(err);
      });
  }

  deleteContact() {
    this.contactService.deleteContact(this.contactId)
      .subscribe(data=>{console.log(data);
      },err=>{
        console.log(err);
      })
    this.router.navigateByUrl('/contacts');
  }

  ModifyContact(contact:any) {
    this.router.navigateByUrl('/contacts/'+contact.nom+'/'+contact.id);
  }

  OnEditPhoto(p) {
    this.currentContact = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.contactService.uploadPhoto(this.currentFileUpload, this.currentContact.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }
}
