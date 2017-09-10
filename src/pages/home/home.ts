import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SmPage } from '../sm/sm';
import { NoticePage } from '../notice/notice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openSmPage() {
    this.navCtrl.setRoot(SmPage);
  }

  openNoticePage() {
    this.navCtrl.setRoot(NoticePage);
  }
}
