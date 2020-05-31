import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts;
  filtredContacts;
  _filter = "";
  currentPage:number=0;
  size:number=5;
  pages :Array<number>;
  i:number;
  currentContact: any;
  editPhoto: boolean;
  private selectedFiles;
  progress: number;
  private currentFileUpload: any;
  private currentTime: number;

  constructor(public contactService:ContactsService, public router:Router) { }

  ngOnInit(): void {
    this.defaultRoute();
  }

  private  defaultRoute()
  {
    this.getContacts('/contacts');
  }
  private getContacts(url) {
    this.contactService.getResource(url)
      .subscribe(data=>{
        this.contacts=data;
        this.filtredContacts = this.contacts;
        this.pages=new Array(this.contacts.totalPages);
      },err=>{
        console.log(err);
      })
  }


  filterContacts(filter: string) {
    if (filter.length == 0){
      this.filtredContacts = this.contacts;
    } else {
      this.filtredContacts = this.contacts.filter(contract => contract.nom.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
  }

  chercher(nom:string) {
    this.contactService.search(nom,this.currentPage,this.size)
      .subscribe(data=>{
        this.contacts=data;
        this.filtredContacts=this.contacts.content;
        this.pages=new Array(this.contacts.totalPages);
      },err=>{
        console.log(err);
      })
  }

  gotoPage(n: number) {
    this.currentPage=n;
    this.i=n;
    this.chercher("");
  }

    getContactById(id:number)
    {
      this.router.navigateByUrl('/contacts/'+id);
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
