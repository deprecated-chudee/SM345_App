import { Component } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { RoomPage } from '.././room/room';

@Component({
  templateUrl: 'mentorAdd.html'
})
export class MentorAddPage {

  constructor(public appCtrl: App, public viewCtrl: ViewController, public navCtrl: NavController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }
}
