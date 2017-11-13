import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { Platform } from 'ionic-angular';
import { ServerService } from '../../app/server.service';
import { Mentoroom } from '../../models/mentoroom';
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

    selectDefualtAuth: number = 1;
    selectDefualtYear: number = 20172;

    public event = {
        month: '2017-01-01',
        timeEnds: '2017-01-01'
    }

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
    }

    ngOnInit() {
        this.serverService.getMentoroomListByYear(20172)
            .then(mentoroom => this.mentorooms = mentoroom);
        this.adminService.userList(1)
            .then(users => this.users = users);
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
        let modal = this.modalCtrl.create(MessageAddPage);
        modal.present();
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

    handleSelectedUser(e: any, user_id: number){
        if(e.checked) {
            this.selectedUser.push(user_id);
        } else {
            // not checked
            let index = this.selectedUser.indexOf(user_id);
            this.selectedUser.splice(index, 1);
        }
    }


/*
    deleteMentoroom(){
        this.serverService.deleteMentoroom(20172)
        .then(mentoroom => this.mentorooms = mentoroom);
    }
    */
}

