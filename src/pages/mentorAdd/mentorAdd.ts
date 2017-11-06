import { Component, OnInit } from '@angular/core';
import { App, NavController, ViewController, ToastController } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { Mentoroom } from '../../models/mentoroom';
import { ServerService } from '../../app/server.service';

@Component({
  templateUrl: 'mentorAdd.html'
})
export class MentorAddPage implements OnInit {

  sort: number = 0;
  sortArray: boolean[] = [];
  private mentoroom: Mentoroom;
  serverService: ServerService;
  USERID: number;
  USERNAME: string;
  USERAUTH: number;

  constructor(public appCtrl: App, public viewCtrl: ViewController, public toastCtrl: ToastController, public navCtrl: NavController, serverService: ServerService) {
    this.mentoroom = new Mentoroom("","","",0,"",0,0,0);
    this.serverService = serverService;
  }

  ngOnInit() {
    this.USERID = ServerService.USERID;
    console.log("멘토신청아이디"+this.USERID);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.mentoroom.mento_id = this.USERID;
    this.serverService.insertMentoroom(this.mentoroom)
    .then(message =>
    {
      this.presentToast(message);
    });
           
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }

  fileClick(sort) {
    this.sortArray[sort] = !this.sortArray[sort];
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
    message: message.title,
    duration: 3000,
    position: 'bottom',
    });
    toast.present();
}
}
