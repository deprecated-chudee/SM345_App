import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmLoginPage } from '../smLogin/smLogin';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openSmLoginPage() {
    let modal = this.modalCtrl.create(SmLoginPage);
    modal.present();
}
}
