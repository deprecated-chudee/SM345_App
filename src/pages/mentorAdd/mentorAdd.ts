import { Component, OnInit } from '@angular/core';
import { App, NavController, ViewController, ToastController } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { Mentoroom } from '../../models/mentoroom';
import { ServerService } from '../../app/server.service';
//import { CoolLocalStorage } from 'angular2-cool-storage';

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
  private currentUser;

  constructor(public app: App, public appCtrl: App, public viewCtrl: ViewController, public toastCtrl: ToastController, public navCtrl: NavController, serverService: ServerService, /*localStorage: CoolLocalStorage*/) {
    this.mentoroom = new Mentoroom("","","",0,"",0,0,0);
    this.serverService = serverService;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERAUTH = this.currentUser.USERAUTH;
    console.log('유저아이디'+this.USERID);
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.mentoroom.mento_id = this.USERID;
    console.log(this.mentoroom.mento_id);
    this.serverService.createMentoroom(this.mentoroom)
    .then(message =>
    {
      this.presentToast(message);
    });
           
    //this.navCtrl.setRoot(RoomPage);
    setTimeout(() => { 
      this.app.getRootNav().setRoot(RoomPage);
      }, 300);
      this.dismiss();
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
