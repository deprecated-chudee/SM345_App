import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'manager.html'
})
export class ManagerPage {
  manager: string = "mentorRoom";
  isAndroid: boolean = false;

  public event = {
    month: '2017-01-01',
    timeEnds: '2017-01-01'
  }

  constructor(public navCtrl: NavController, platform: Platform) {
      this.isAndroid = platform.is('android');
  }


  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}

