import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { Contact } from '../../model/contact';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  model: Contact;
  key: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    private service: ServiceProvider,
    private toast: ToastController) {

    // se model estiver preenchido
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
  }

  save() {
    this.saveContact().then(
      () => {
        this.toast.create({message: 'Contact save!', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      }
    )
    .catch(
      () => {
        this.toast.create({message: 'Error!', duration: 3000, position: 'botton' }).present();
      }
    )
    //this.navCtrl.pop();
  }

  saveContact() {
    if (this.key) {     
      return this.service.update(this.key, this.model);
    } else {
      return this.service.insert(this.model);
    }
  }
}
