import { Component } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';

import { RoomPage } from '.././room/room';

@Component({
  templateUrl: 'surveyWrite.html'
})
export class SurveyWritePage {

  constructor(
      public viewCtrl: ViewController,
      public appCtrl: App,

    ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
 }

 openRoomDetailPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
 }
}
