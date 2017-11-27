import { OnInit, Component } from '@angular/core';
import { App, NavController, ViewController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { ManagerPage } from '.././manager/manager';

import { AdminService } from '../../services/admin.service';
import { MentoroomService } from '../../services/mentoroom.service';
import { Mentoroom } from '../../models/mentoroom';
import { MyApp } from '../../app/app.component';
import { Menti } from '../../models/menti';

@Component({
  templateUrl: 'roomDetail.html'
})
export class RoomDetailPage implements OnInit {
  private mentis: Menti[] =[];
  public selectedRoom: Mentoroom;
  private USERID: number;
  private USERAUTH: number;
  private USERNAME: string;
  private currentUser;
  private room: number;
  private mento_id;
  sort: boolean = false;

  constructor(
    public app: App, 
    public toastCtrl: ToastController, 
    private adminService: AdminService, 
    private mentoroomService: MentoroomService,
    public navParams: NavParams, 
    public appCtrl: App, 
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this.selectedRoom = this.navParams.get("selectedRoom");
    this.room = this.navParams.get("room");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERNAME = this.currentUser.USERNAME;
    this.USERAUTH = this.currentUser.USERAUTH;
    this.mento_id = this.selectedRoom.mento_id;
  }

  ngOnInit() {
    console.log(this.mento_id);
    this.mentoroomService.menti_list(this.mento_id)
      .then(menti => this.mentis = menti);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }

  //관리자 - 멘토방 개설 승낙
  confirm() {
    this.adminService.confirmMentoroom(this.selectedRoom);
    this.Toast('개설이 완료되었습니다');
    if(this.room == 0){
    setTimeout(() => { 
      this.app.getRootNav().setRoot(RoomPage);
      }, 300);
      this.dismiss();
    }
    if(this.room == 1){
      setTimeout(() => { 
        this.app.getRootNav().setRoot(ManagerPage);
        }, 300);
        this.dismiss();
    }
  }

  //관리자 - 멘토방 개설 반려
  reject(){
    this.adminService.rejectMentoroom(this.selectedRoom.mentoroom_id);
    this.Toast('개설이 반려되었습니다');
    if(this.room == 0){
      setTimeout(() => { 
        this.app.getRootNav().setRoot(RoomPage);
        }, 300);
        this.dismiss();
      }
      if(this.room == 1){
        setTimeout(() => { 
          this.app.getRootNav().setRoot(ManagerPage);
          }, 300);
          this.dismiss();
      }
  }

  //멘티신청
  joinMentee() {
    this.mentoroomService.joinMentee(this.selectedRoom.mento_id, this.USERID)
      .then(response => this.Toast('멘티신청이 완료되었습니다.'))
        localStorage.setItem('currentUser', JSON.stringify({ 
          USERID: this.USERID,
          USERNAME: this.USERNAME,
          USERAUTH: 2
        }));
          this.appCtrl.getRootNav().setRoot(MyApp);
          window.location.reload();
  }

  //멘티신청 취소
  cancelMentee() {
    this.mentoroomService.cancelMentee(this.selectedRoom.mento_id, this.USERID)
    .then(response => this.Toast('멘티신청이 취소되었습니다.'))
      localStorage.setItem('currentUser', JSON.stringify({ 
        USERID: this.USERID,
        USERNAME: this.USERNAME,
        USERAUTH: 0
      }));
        this.appCtrl.getRootNav().setRoot(MyApp);
        window.location.reload();
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  //보고서 제출 파일첨부 창 띄우기
  openReport() {
    this.sort = true;
  }

  //보고서 파일 제출하기
  reportSave() {
    this.Toast('보고서 제출이 완료되었습니다.');
    setTimeout(() => { 
      this.dismiss();
    }, 500);
  }

}
