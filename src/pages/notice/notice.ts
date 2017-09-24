import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WritePage } from '../write/write';
import { ReadingPage } from '../reading/reading';

@Component({
  templateUrl: 'notice.html'
})
export class NoticePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  showReadyAlert() {
    let alert = this.alertCtrl.create({
        title: '준비 중입니다',
        subTitle: '빠른 시일 내에 준비하겠습니다.',
        buttons: ['OK'],
    });
    alert.present();
  }

  openWritePage() {
    this.navCtrl.push(WritePage);
  }

  openReadingPage() {
    this.navCtrl.push(ReadingPage);
  }

}
