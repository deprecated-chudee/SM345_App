import { Component, OnInit } from '@angular/core';
import { App, NavController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
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
    manager: string = "roomList";
    isAndroid: boolean = false;
    private count:number = 1;
    private mentorooms: Mentoroom[] = [];
    private users: User[] = [];
    private selectedUser = [];
    private selectedRoom = [];

    selectedAllRoom: boolean = false; //멘토방목록 전체선택
    selectedAllUser: boolean = false; //사용자관리 전체선택
    selectedAllReport: boolean = false; //보고서목록 전체선택

    selectDefualtAuth: number = 1;
    selectDefualtYear: number = 20172;
    private mentoRoomInfo: MentoRoomInfo; //멘토방 설정
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
        public toastCtrl: ToastController,
        public viewCtrl: ViewController,
        public app: App,
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
        this.getMentoroomListByYear(20172);
        this.userList(0);
    }

    //멘토방 설정시킨 것 불러오기
    getMentoRoomInfo() {
        this.serverService.getMentoRoomInfo()
            .then(mentoRoomInfo => this.mentoRoomInfo = mentoRoomInfo)
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

    userList(e) {
        this.selectedUser = [];
        this.selectedAllUser = false;
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
            mentoroom_id: mentoroom.mentoroom_id, room: 1,
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
                        this.Toast('관리자로 지정되었습니다');
                    }
                }
            ]
        });
        alert.present();
    }

    showManagerAlert2() {
        let alert = this.alertCtrl.create({
            title: '관리자 권한 해제',
            subTitle: '관리자 권한을 해제하시겠습니까?',
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
                            this.serverService.updateLeaveUser(uid)
                        }
                        this.Toast('관리자 권한이 해제되었습니다');
                    }
                }
            ]
        });
        alert.present();
    }

    Toast(message) {
        let toast = this.toastCtrl.create({
            message: message,
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

    // 멘토방 선택
    handleSelectedRoom(e, room_id) {
        if(e.checked) {
            this.selectedRoom.push(room_id)
        } else {
            let index = this.selectedRoom.indexOf(room_id)
            this.selectedRoom.splice(index, 1)
        }
    }

    // 멘토방 선택 전체
    handleSelectedAllRoom(e) {
        this.selectedAllRoom = !this.selectedAllRoom;
        if(e.checked) {
            this.selectedRoom = [];

            this.mentorooms.forEach(e => {
                this.selectedRoom.push(e.mentoroom_id)
            })
        } else {
            this.selectedRoom = [];
        }
    }

    // 유저 선택
    handleSelectedUser(e, user_id) {
        if(e.checked) {
            this.selectedUser.push(user_id)
        } else {
            let index = this.selectedUser.indexOf(user_id)
            this.selectedUser.splice(index, 1)
        }
    }

    // 유저 선택 전체
    handleSelectedAllUser(e) {
        this.selectedAllUser = !this.selectedAllUser;
        if(e.checked) {
            this.selectedUser = [];

            this.users.forEach(e => {
                this.selectedUser.push(e.user_id)
            })
        } else {
            this.selectedUser = [];
        }
    }

    // 보고서 선택
    handleSelectedReport(e, user_id) {
        if(e.checked) {
            this.selectedUser.push(user_id)
        } else {
            let index = this.selectedUser.indexOf(user_id)
            this.selectedUser.splice(index, 1)
        }
    }

    // 보고서 선택 전체
    handleSelectedAllReport(e) {
        this.selectedAllUser = !this.selectedAllUser;
        if(e.checked) {
            this.selectedUser = [];

            this.users.forEach(e => {
                this.selectedUser.push(e.user_id)
            })
        } else {
            this.selectedUser = [];
        }
    }

    // 멘토방 삭제
    handleRemoveRoom() {
        if(this.selectedRoom.length > 0) {
            this.selectedRoom.forEach(e => {
                this.adminService.removeRoom(e)
                    .then(() => console.log('remove id: ' + e))
            })
            setTimeout(() => { 
                this.app.getRootNav().setRoot(ManagerPage);
            }, 300);
            let toast = this.toastCtrl.create({
                message: '선택한 멘토방이 삭제되었습니다.',
                duration: 3000,
                position: 'bottom',
            });
            toast.present();
        } else {
            let toast = this.toastCtrl.create({
                message: '보고서가 존재하지 않습니다.',
                duration: 3000,
                position: 'bottom',
            });
            toast.present();
            this.app.getRootNav().setRoot(ManagerPage);
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

