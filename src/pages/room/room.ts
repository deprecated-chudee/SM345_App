import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { RoomDetailPage } from '.././roomDetail/roomDetail';
import { MentorAddPage } from '.././mentorAdd/mentorAdd';
import { ServerService } from '../../app/server.service';
import { Mentoroom } from '../../models/mentoroom';

@Component({
  templateUrl: 'room.html'
})
export class RoomPage  implements OnInit {
  serverService: ServerService;
  private mentorooms: Mentoroom[] = [];

  constructor( serverService: ServerService, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.serverService = serverService;
  }

  ngOnInit() {
    this.serverService.getMentoroomList().then(
      mentoroom => { this.mentorooms = mentoroom;
    });
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
