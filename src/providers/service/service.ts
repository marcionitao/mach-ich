import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { Contact } from '../../model/contact';
import { ContactList } from '../../model/contactlist';

@Injectable()
export class ServiceProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(contact: Contact) {
    // key is for not duplication value
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, contact);
  }

  public update(key: string, contact: Contact) {
    return this.save(key, contact);
  }

  private save(key: string, contact: Contact) {
    return this.storage.set(key, contact);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {
    let contacts: ContactList[] = [];

    return this.storage.forEach((value: Contact, key: string, iterationNumber: Number) => {
     
      let contact = new ContactList();
      
      contact.key = key;
      contact.contact = value;

      contacts.push(contact);
    })
      .then(() => {
        console.log(contacts);
        return Promise.resolve(contacts);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}
