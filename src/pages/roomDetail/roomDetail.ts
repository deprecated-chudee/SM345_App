
import { OnInit, Component } from '@angular/core';
import { 
  App, 
  NavController,
  ViewController, 
  NavParams, 
  ToastController, 
  AlertController,
  ActionSheetController
} from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { ManagerPage } from '.././manager/manager';
import { SurveyWritePage } from '.././surveyWrite/surveyWrite';

import { AdminService } from '../../services/admin.service';
import { MentoroomService } from '../../services/mentoroom.service';
import { SurveyService } from '../../services/survey.service';
import { Mentoroom } from '../../models/mentoroom';
import { MyApp } from '../../app/app.component';
import { Menti } from '../../models/menti';
import { Upload } from '../../models/upload';
import { Student } from '../../models/student';

import * as FileSaver from 'file-saver';
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
  private mento_name;
  sort: boolean = false;
  private student: Student;
  private survey_check: number;

  private formData;
  private fileLabel: string = '';
  private files: Upload[] = [];
  
  constructor(
    public app: App, 
    public toastCtrl: ToastController, 
    private adminService: AdminService, 
    private mentoroomService: MentoroomService,
    public navParams: NavParams, 
    public appCtrl: App, 
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private surveyService: SurveyService,
  ) {
    this.selectedRoom = this.navParams.get("selectedRoom");
    this.room = this.navParams.get("room");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERNAME = this.currentUser.USERNAME;
    this.USERAUTH = this.currentUser.USERAUTH;
    this.mento_id = this.selectedRoom.mento_id;
    this.mento_name = this.selectedRoom.mento_name;
  }
  
  ngOnInit() {
    this.mentoroomService.menti_list(this.mento_id)
    .then(menti => this.mentis = menti);
  
    this.fileList()
    this.surveyCheck();
    console.log('survey_check: ' + this.survey_check);
  }

  //설문조사 참여여부
  surveyCheck() {
    this.surveyService.surveyCheck(this.USERID);
  }

  // 파일 리스트 가져오기
  fileList() {
    this.mentoroomService.fileList(this.selectedRoom.mentoroom_id)
      .then(files => {
        this.files = files
        console.log(files)
      })
  }

  // 파일 업로드 버튼 클릭 핸들러
  onChange(event) {
    if(event.target.files && event.target.files.length > 0) {
      let file: File = event.target.files[0];
      this.formData = new FormData();
      this.formData.append(event.target.name, file, file.name);
      this.fileLabel = file.name;
    } else {
      this.formData = undefined;
      this.fileLabel = '';
    }
  }

  // 파일 서버에 저장
  save() {
    if(this.formData) {
      this.mentoroomService.fileUpload(this.formData, this.selectedRoom.mentoroom_id)
      .then(() => {
        this.Toast('업로드 성공');
        this.dismiss();
      })
      .catch(err => {
        this.Toast('업로드 실패');
        this.dismiss();
      }) 
    }
  }

  // 파일 사용자 다운로드
  download(name, data, type) {
    let binary = atob(data);
    var byteArray = new Uint8Array(new ArrayBuffer(binary.length));
    for (var i = 0; i < binary.length; i++) byteArray[i] = binary.charCodeAt(i);
    let blob = new Blob([byteArray], {type: type})
    FileSaver.saveAs(blob, name)
  }

  // 파일 삭제
  fileDelete(file_id) {
    this.mentoroomService.fileDelete(this.selectedRoom.mentoroom_id, file_id)
      .then(() => {
        this.Toast('파일 삭제 성공');
        this.dismiss();
      })
      .catch(err => {
        this.Toast('파일 삭제 실패');
        this.dismiss();
      }) 
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
          this.appCtrl.getRootNav().setRoot(RoomPage);
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
        this.appCtrl.getRootNav().setRoot(RoomPage);
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

  // 보고서 승인 & 반려 함수
  actionSheet(file_id, file_state) {
    console.log(file_id, file_state)
    if(this.USERAUTH === 3 && file_state === 0) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '작업 선택',
        buttons: [
          {
              text: '승인',
              handler: () => {
                this.reportConfirm(file_id)
              }
          },{
            text: '반려',
            role: 'destructive',
            handler: () => {
              this.reportReject(file_id)
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  // 보고서 승인
  reportConfirm(file_id) {
    this.adminService.reportConfirm(file_id)
      .then(() => {
        this.Toast('보고서가 승인 되었습니다.')
        this.appCtrl.getRootNav().setRoot(RoomPage)
      })
      .catch(() => this.Toast('서버와의 통신 에러입니다. 잠시 후 다시 시도해 주세요.'))
  }

  // 보고서 반려
  reportReject(file_id) {
    this.adminService.reportReject(file_id)
    .then(() => {
      this.Toast('보고서가 반려 되었습니다.')
      this.appCtrl.getRootNav().setRoot(RoomPage)
    })
    .catch(() => this.Toast('서버와의 통신 에러입니다. 잠시 후 다시 시도해 주세요.'))
  }

  OpenSurveyWrite() {
    this.appCtrl.getRootNav().setRoot(SurveyWritePage);
  }
}
