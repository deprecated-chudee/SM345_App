import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '.././home/home';

@Component({
  templateUrl: 'sm.html'
})
export class SmPage {

  constructor(public navCtrl: NavController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}
