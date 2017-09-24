import { Component } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { RoomPage } from '.././room/room';

@Component({
  templateUrl: 'roomDetail.html'
})
export class RoomDetailPage {

  constructor(public appCtrl: App, public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }
}
