import { Component } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { RoomPage } from '.././room/room';

@Component({
  templateUrl: 'mentorAdd.html'
})
export class MentorAddPage {

  sort: number = 0;
  sortArray: boolean[] = [];

  constructor(public appCtrl: App, public viewCtrl: ViewController, public navCtrl: NavController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }

  fileClick(sort) {
    this.sortArray[sort] = !this.sortArray[sort];
  }

  
}
