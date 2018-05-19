import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';

import { ServiceProvider } from '../../providers/service/service';
import { Contact } from '../../model/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  private contacts: Promise<Contact[]>;
  private contact: Contact;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              private service: ServiceProvider,
              private toast: ToastController ) {

  }

  ionViewDidLoad() {
    this.contacts = this.getAllContacts();
  }

  addContact() {
    this.navCtrl.push(AddItemPage);
  }

  saveItem(item) {
    this.items.push(item);
  }

  editContact(item: Contact) {
    this.navCtrl.push(AddItemPage, {key: item.key, contact: Contact});
  }

  getAllContacts(){
    return this.service.getAll();
  }

  removeContact(item: Contact){
    this.service.remove(item.key);
    this.navCtrl.pop();
  }

}
