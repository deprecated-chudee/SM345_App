import { Component, OnInit } from '@angular/core';
import { App, NavController, ViewController, ToastController } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { Mentoroom } from '../../models/mentoroom';

import { MentoroomService } from '../../services/mentoroom.service';

@Component({
  templateUrl: 'mentorAdd.html'
})
export class MentorAddPage implements OnInit {

  sort: number = 0;
  sortArray: boolean[] = [];
  private mentoroom: Mentoroom;
  private image;
  private imageLabel = '';
  private credentialsFile;
  private credentialsFileLabel = '';

  USERID: number;
  USERNAME: string;
  USERAUTH: number;
  private currentUser;

  constructor(
    public app: App, 
    public appCtrl: App, 
    public viewCtrl: ViewController, 
    public toastCtrl: ToastController, 
    public navCtrl: NavController, 
    private mentoroomService: MentoroomService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERAUTH = this.currentUser.USERAUTH;
    this.mentoroom = new Mentoroom('', '', '', '');
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // 멘토 신청 아 왜안댐 ㅜㅜ
  async save() {
    let { team_name, team_theme, team_about } = await this.mentoroom;
    if(!team_name) { this.Toast('팀 이름을 작성해 주세요.'); return false; }
    if(!team_theme) { this.Toast('팀 주제를 작성해 주세요.'); return false; }
    if(!team_about) { this.Toast('팀 소개 및 설명을 작성해 주세요.'); return false; }
    if(!this.image) { this.Toast('팀 사진을 업로드 해주세요.'); return false; }
    if(!this.credentialsFile) { this.Toast('자격증명 파일을 업로드 해주세요.'); return false; }
    this.mentoroom.mento_id = await this.USERID;
    await console.log(this.image)
    await console.log(this.credentialsFile)
    let r_id = await this.mentoroomService.createMentoroom1(this.mentoroom).then(r_id => r_id)
    await this.mentoroomService.createMentoroom2(r_id, 2, this.image)
      .then(res => {
        console.log(res)
      })
    await this.mentoroomService.createMentoroom2(r_id, 3, this.credentialsFile)
      .then(res => {
        console.log(res)
      })
      
    await this.Toast('멘토 신청이 완료되었습니다.')
    
    
    //this.navCtrl.setRoot(RoomPage);
    // setTimeout(() => { 
    //     this.app.getRootNav().setRoot(RoomPage);
    //   }, 300);
    //   this.dismiss();
  }

  // 이미지 업로드
  onChangeImage(event) {
    if(event.target.files && event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.image = new FormData();
      this.image.append(event.target.name, file, file.name);
      this.imageLabel = file.name;
      console.log(this.image.getAll(event.target.name))
    } else {
      this.image = undefined;
      this.imageLabel = '';
    }
  }

  // 자격 증명 파일 업로드
  onChangeFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.credentialsFile = new FormData();
      this.credentialsFile.append(event.target.name, file, file.name);
      this.credentialsFileLabel = file.name;
      console.log(this.credentialsFile.getAll(event.target.name))
    } else {
      this.credentialsFile = undefined;
      this.credentialsFileLabel = '';
    }
  }

  fileClick(sort) {
    this.sortArray[sort] = !this.sortArray[sort];
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
