import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, NavController, ViewController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { ManagerPage } from '.././manager/manager';

import { AdminService } from '../../services/admin.service';
import { MentoroomService } from '../../services/mentoroom.service';

import { Mentoroom } from '../../models/mentoroom';

@Component({
  templateUrl: 'roomDetail.html'
})
export class RoomDetailPage {
  public selectedRoom: Mentoroom;
  private USERID: number;
  private USERAUTH: number;
  private currentUser;
  private room: number;
  sort: boolean = false;

  private formData;
  fileLabel: string = '';

  loading: boolean = false;

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
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  onChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.formData = new FormData();
      this.formData.append('uploadFile', file, file.name);
      this.fileLabel = file.name;
    } else {
      this.formData = undefined;
      this.fileLabel = '';
    }
  } 

  save() {
    if(this.formData) {
      this.mentoroomService.fileUpload(this.formData, this.selectedRoom.mentoroom_id, 1)
        .then(() => {
          this.Toast('업로드 성공');
          this.dismiss();
        })
        .catch(err => {
          this.Toast('업로드 실패');
          this.dismiss();
        }) 
    } else {
      this.Toast('파일이 없습니다.');
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }

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

  //멘티 신청
  joinMentee() {
    this.mentoroomService.joinMentee(this.selectedRoom.mentoroom_id, this.USERID)
      .then(response => this.Toast(response))
      .catch(() => this.Toast('실패'))
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  //팀원확인
  mentiListCheck() {
    let alert = this.alertCtrl.create({
      title: 'Basic Alert',
      subTitle: '기본 알림창입니다.',
      buttons: ['OK']
    });
    alert.present();
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
