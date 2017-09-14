import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '.././home/home';

@Component({
  templateUrl: 'room.html'
})
export class RoomPage {

  constructor(public navCtrl: NavController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}
