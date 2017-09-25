import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'survey.html'
})
export class SurveyPage {

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
}
}
