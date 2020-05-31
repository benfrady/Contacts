import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public host:string="http://localhost:8080";
  constructor(private http:HttpClient) {
  }

  public getResource(url){
    return this.http.get(this.host+url);
  }

  public saveContact(contact)
  {
    return this.http.post(this.host+"/contacts",contact)
  }

  public search(name:string, page:number, size:number)
  {
    return this.http.get(this.host+"/chercherContacts?mc="+name+"&size="+size+"&page="+page);
  }

  public getContactByID(contactId: number) {
    return this.http.get(this.host+"/contacts/"+contactId);
  }

  public deleteContact(id: number) {
      return this.http.delete(this.host+"/contacts/"+id);
  }

  updateContact(contactId: number, contact: any) {
    return this.http.put(this.host+"/contacts/"+contactId,contact);
  }

  uploadPhoto(file: File, id): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
