import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { RoomDetailPage } from '.././roomDetail/roomDetail';
import { MentorAddPage } from '.././mentorAdd/mentorAdd';

import { MentoroomService } from '../../services/mentoroom.service';

import { Mentoroom } from '../../models/mentoroom';

@Component({
  templateUrl: 'room.html'
})
export class RoomPage  implements OnInit {
  private mentorooms: Mentoroom[];
  private currentUser;
  private USERAUTH;

  constructor( 
    private mentoroomService: MentoroomService, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  ngOnInit() {
    this.mentoroomService.getMentoroomList()
    .then(mentorooms => this.mentorooms = mentorooms);
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openRoomDetailPage(selectedRoom) {
    this.navCtrl.push(RoomDetailPage, {
      selectedRoom: selectedRoom
    });
  }

  openMentorAddPage() {
    let modal = this.modalCtrl.create(MentorAddPage);
    modal.present();
  }
}
