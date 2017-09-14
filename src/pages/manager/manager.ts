import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '.././home/home';

@Component({
  templateUrl: 'manager.html'
})
export class ManagerPage {

  constructor(public navCtrl: NavController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}
