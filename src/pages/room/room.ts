import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { RoomDetailPage } from '.././roomDetail/roomDetail';
import { MentorAddPage } from '.././mentorAdd/mentorAdd';

@Component({
  templateUrl: 'room.html'
})
export class RoomPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openRoomDetailPage() {
    let modal = this.modalCtrl.create(RoomDetailPage);
    modal.present();
  }

  openMentorAddPage() {
    let modal = this.modalCtrl.create(MentorAddPage);
    modal.present();
  }
}
