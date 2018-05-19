import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { Contact } from '../../model/contact';

@Injectable()
export class ServiceProvider {

  private contact: Contact;
  private contacts: Contact[] = [];
  mykey: any;
  
  constructor(private storage: Storage, private datepipe: DatePipe) {}

  public insert(contact: Contact){
    // key is for not duplication value
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, contact);
  }

  public update(key: string, contact: Contact){
    this.mykey = key;
    this.storage.set(this.mykey, contact);
  }

  // key is add value to Storage
  private save(key: string, contact: Contact){
    this.mykey = key;
    this.storage.set(this.mykey, contact);
  }

  public remove(key: string){
   /* this.mykey = key;
    this.storage.remove(this.mykey);*/
      // filtra no array todas as notas cuja a data(number) é diferente da nota selecionada para Deletar
      this.contacts = this.contacts.filter((contact) => {
        console.log("Delete: "+ contact.key + " - "+key);
        return contact.key !== key
      });
      // add no storage os dados do filtro
      this.storage.set(key, this.contacts);
    }
  

  public getAll(){
    return this.storage.get(this.mykey).then(
      (contacts) => {
        this.contacts = contacts == null ? [] : contacts;
        console.log( this.contacts.slice());
         return [...this.contacts]; // return this.notes.slice() // return a copy of array
        //return this.notes.slice();        
      }
    ) // Returns a promise with the value of the given key
  }

}
