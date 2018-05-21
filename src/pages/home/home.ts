import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';

import { ServiceProvider } from '../../providers/service/service';
import { ContactList } from './../../model/ContactList';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: ContactList[];

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              private service: ServiceProvider,
              private toast: ToastController ) {

                
  }

  ionViewWillEnter() {
    this.service.getAll().then(
      (result) => {
        console.log(result);
        this.contacts = result;
      }
    );
  }

  addContact() {
    this.navCtrl.push(AddItemPage);
  }

  editContact(item: ContactList) {
    this.navCtrl.push(AddItemPage, { key: item.key, contact: item.contact });
  }

  removeContact(item: ContactList){
    this.service.remove(item.key)
    .then(() => {
      // Removendo do array de items
      var index = this.contacts.indexOf(item);
      this.contacts.splice(index, 1);
      this.toast.create({ message: 'Contato removido.', duration: 3000, position: 'botton' }).present();
    })
  }

}
