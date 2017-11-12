import { Component, OnInit } from '@angular/core';
import { App, NavController, ViewController, NavParams, ToastController, } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { ServerService } from '../../app/server.service';
import { Mentoroom } from '../../models/mentoroom';

@Component({
  templateUrl: 'roomDetail.html'
})
export class RoomDetailPage implements OnInit {
  private mentoroom_id;
  private mentoroom: Mentoroom;
  serverService: ServerService;
  private USERID;
  private USERAUTH;

  constructor(public app: App, public toastCtrl: ToastController, serverService: ServerService, public navParams: NavParams, public appCtrl: App, public viewCtrl: ViewController) {
    this.mentoroom_id = this.navParams.get("mentoroom_id");
    this.serverService = serverService;
    this.mentoroom = new Mentoroom("","","",0,"",0,0,0);
  }

  ngOnInit() {
    this.serverService.getMentoroom(this.mentoroom_id).then(
      mentoroom => { this.mentoroom = mentoroom;
                     this.USERID = ServerService.USERID;
                     this.USERAUTH = ServerService.USERAUTH;
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }

  confirm(mentoroom) {
    this.serverService.confirmMentoroom(mentoroom);
    this.Toast('개설이 완료되었습니다');
    setTimeout(() => { 
      this.app.getRootNav().setRoot(RoomPage);
      }, 300);
      this.dismiss();
  }

  reject(){
    this.serverService.rejectMentoroom(this.mentoroom_id);
    this.Toast('개설이 반려되었습니다');
    setTimeout(() => { 
      this.app.getRootNav().setRoot(RoomPage);
      }, 300);
      this.dismiss();
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom',
    });
    toast.present();
  }

}
