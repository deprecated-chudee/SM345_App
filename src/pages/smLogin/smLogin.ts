import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'smLogin.html'
})
export class SmLoginPage {

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
}
}
