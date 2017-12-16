import { Component, OnInit } from '@angular/core';
import { App, NavController, ViewController, ToastController } from 'ionic-angular';

import { Mentoroom } from '../../models/mentoroom';
import { Upload } from '../../models/upload';
import { RoomPage } from '.././room/room';
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
  private mentoroom_id: number;

  USERID: number;
  USERNAME: string;
  USERAUTH: number;
  private currentUser;

  private files: Upload[] = [];
  

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
    this.USERNAME = this.currentUser.USERNAME;
    this.mentoroom = new Mentoroom('', '', '', '');
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // 파일 서버에 저장
  async save() {
    let { team_name, team_theme, team_about } = await this.mentoroom;
    if(!team_name) { this.Toast('팀 이름을 작성해 주세요.'); return false; }
    if(!team_theme) { this.Toast('팀 주제를 작성해 주세요.'); return false; }
    if(!team_about) { this.Toast('팀 소개 및 설명을 작성해 주세요.'); return false; }
    if(!this.image) { this.Toast('팀 사진을 업로드 해주세요.'); return false; }
    if(!this.credentialsFile) { this.Toast('자격증명 파일을 업로드 해주세요.'); return false; }
    
    try {
      this.mentoroom.mento_id = await this.USERID;
      let r_id = await this.mentoroomService.createMentoroom1(this.mentoroom).then(r_id => r_id);
  
      if(this.image) {
        await this.mentoroomService.fileUpload(this.image, r_id, 2)
      }
      if(this.credentialsFile) {
        await this.mentoroomService.fileUpload(this.credentialsFile, r_id, 3)               
      }
      
      await this.Toast('멘토신청이 완료되었습니다');
      await localStorage.setItem('currentUser', JSON.stringify({ 
        USERID: this.USERID,
        USERNAME: this.USERNAME,
        USERAUTH: 1
      }));
      
      await this.dismiss();
  
    }
    catch(e) {
      this.Toast('업로드 실패');
      this.dismiss();
    }
  }

  
  // 이미지 업로드
  onChangeImage(event) {
    if(event.target.files && event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.image = new FormData();
      this.image.append(event.target.name, file, file.name);
      this.imageLabel = file.name;
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
