import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmEditPage } from '.././smEdit/smEdit';

@Component({
  templateUrl: 'sm.html'
})
export class SmPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  OpenSmEditPage() {
    let modal = this.modalCtrl.create(SmEditPage);
    modal.present();
  }
}
