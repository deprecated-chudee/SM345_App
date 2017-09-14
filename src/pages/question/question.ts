import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '.././home/home';

@Component({
  templateUrl: 'question.html'
})
export class QuestionPage {

  constructor(public navCtrl: NavController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}
