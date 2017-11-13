import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { Platform } from 'ionic-angular';
import { ServerService } from '../../app/server.service';
import { Mentoroom } from '../../models/mentoroom';
import { MentoRoomInfo } from '../../models/mentoRoomInfo';
import { User } from '../../models/user';

import { RoomDetailPage } from '.././roomDetail/roomDetail';
import { MessageAddPage } from '.././messageAdd/messageAdd';
import { SurveyPage } from '.././survey/survey';

import { AdminService } from '../../app/admin.service';

@Component({
    templateUrl: 'manager.html'
})
export class ManagerPage implements OnInit{
    manager: string = "mentorRoom";
    isAndroid: boolean = false;
    private count:number = 1;
    private mentorooms: Mentoroom[] = [];
    private users: User[] = [];
    private selectedUser = [];
    private selectedAll: boolean = false;

    selectDefualtAuth: number = 1;
    selectDefualtYear: number = 20172;
    private mentoRoomInfo: MentoRoomInfo; //관리자 페이지 - 멘토방 설정
    USERID: number;
    USERNAME: string;
    USERAUTH: number;
    private currentUser;
    private roomListChecked: boolean[] = [];

    constructor(
        private serverService: ServerService, 
        private adminService: AdminService, 
        public modalCtrl: ModalController, 
        public navCtrl: NavController, 
        platform: Platform, 
        public alertCtrl: AlertController, 
        public toastCtrl: ToastController
    ) {
        this.isAndroid = platform.is('android');
        this.mentoRoomInfo = new MentoRoomInfo(1, "","","","","","","","","","");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
        this.serverService = serverService;
        this.getMentoRoomInfo()
    }

    ngOnInit() {
        this.serverService.getMentoroomListByYear(20172)
            .then(mentoroom => this.mentorooms = mentoroom);
        this.adminService.userList(1)
            .then(users => this.users = users);
    }

    //멘토방 설정시킨 것 불러오기
    getMentoRoomInfo() {
        this.serverService.getMentoRoomInfo()
            .then(mentoRoomInfo => this.mentoRoomInfo = mentoRoomInfo)
    }

    handleSelectedUser(e: any, user_id: number) {
        // checked
        if(e.checked) {
            this.selectedUser.push(user_id)
        } else {
            // not checked
            let index = this.selectedUser.indexOf(user_id)
            this.selectedUser.splice(index, 1)
        }
    }

    //멘토방 설정 저장
    mentoRoomInfoSave() {
        this.serverService.createMentoRoomInfo(this.mentoRoomInfo)
        .then(message =>
        {
          this.presentToast();
        });
        console.log(typeof(this.mentoRoomInfo.max_mento));
    }

    //멘토방 설정 완료 알림창
    presentToast() {
        let toast = this.toastCtrl.create({
        message: '멘토방 설정이 완료되었습니다.',
        duration: 3000,
        position: 'top',
        });
        toast.present();
    }

    //멘토방목록 - 전체선택 클릭 시
    roomList_selectedAll() {
        this.selectedAll=!this.selectedAll;
        console.log(this.selectedAll);
    }

    userList(e) {
      this.adminService.userList(e)
        .then(users => this.users = users)
    }

    getMentoroomListByYear(e){
        this.serverService.getMentoroomListByYear(e)
        .then(mentoroom => this.mentorooms = mentoroom);
    }

    openHomePage() {
        this.navCtrl.setRoot(HomePage);
    }

    openRoomDetail(mentoroom) {
        this.navCtrl.push(RoomDetailPage, {
            mentoroom_id: mentoroom.mentoroom_id,
          });
    }

    showManagerAlert() {
        let alert = this.alertCtrl.create({
            title: '관리자 지정',
            subTitle: '관리자로 지정하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: data => {
                    }
                },
                {
                    text: '확인',
                    handler: data => {
                        for(let uid of this.selectedUser){
                            this.serverService.updateEmpowerUser(uid)
                        }
                        this.managerToast();
                    }
                }
            ]
        });
        alert.present();
    }

    managerToast() {
        let toast = this.toastCtrl.create({
            message: '관리자로 지정되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    }

    openMessagePage() {
        this.navCtrl.push(MessageAddPage, {
            selectedUser: this.selectedUser
        })
        // let modal = this.modalCtrl.create(MessageAddPage);
        // modal.present(this.selectedUser);
    }

    showReportDeleteAlert() {
        let alert = this.alertCtrl.create({
            title: '보고서 삭제',
            subTitle: '선택한 보고서를 삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: data => {
                    }
                },
                {
                    text: '확인',
                    handler: data => {
                        this.deleteToast();
                    }
                }
            ]
        });
        alert.present();
    }

    deleteToast() {
        let toast = this.toastCtrl.create({
            message: '보고서가 삭제되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    }

    showReportDownloardAlert() {
        let alert = this.alertCtrl.create({
            title: '보고서 다운로드',
            subTitle: '선택한 보고서를 다운로드 하시겠습니까?',
            buttons: [
                {
                  text: '취소',
                  handler: data => {
                  }
                },
                {
                  text: '확인',
                  handler: data => {
                      this.downloadToast();
                  }
                }
            ]
        });
        alert.present();
    }

    downloadToast() {
        let toast = this.toastCtrl.create({
            message: '보고서가 다운로드 되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    }

    addSurvey(){
        if(this.count <= 4) {
            this.count += 1;
        } else {
            this.showAlert('더이상 추가할 수 없습니다.');
        }
    }

    minusSurvey(){
        if(this.count > 1) {
            this.count -= 1;
        } else {
            this.showAlert('더이상 제거할 수 없습니다');
        }
    }

    showAlert(ms:string) {
        let alert = this.alertCtrl.create({
            title: ms,
            buttons: ['OK'],
        });
        alert.present();    
    }

    openSurveyPage() {
        let modal = this.modalCtrl.create(SurveyPage);
        modal.present();
    }



/*
    deleteMentoroom(){
        this.serverService.deleteMentoroom(20172)
        .then(mentoroom => this.mentorooms = mentoroom);
    }
    */
}

