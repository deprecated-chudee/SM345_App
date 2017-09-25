import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { ReadingPage } from '.././reading/reading';

@Component({
  templateUrl: 'question.html'
})
export class QuestionPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openReadingPage() {
    this.navCtrl.push(ReadingPage);
  }

  showReadyAlert() {
    let alert = this.alertCtrl.create({
        title: '준비 중입니다',
        buttons: ['OK'],
    });
    alert.present();
  }
}
