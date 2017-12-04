import { Component, OnInit } from '@angular/core';
import { 
    App, 
    NavController, 
    AlertController, 
    ToastController, 
    ModalController, 
    ViewController,
    Platform
} from 'ionic-angular';
import { HomePage } from '.././home/home';

import { RoomDetailPage } from '.././roomDetail/roomDetail';
import { MessageAddPage } from '.././messageAdd/messageAdd';
import { SurveyPage } from '.././survey/survey';

import { MentoroomService } from '../../services/mentoroom.service';
import { AdminService } from '../../services/admin.service';
import { XlsxToJsonService } from '../../services/xlsx-to-json.service';

import { User } from '../../models/user';
import { Mentoroom } from '../../models/mentoroom';
import { MentoroomInfo } from '../../models/mentoroomInfo';
import { ReportDate } from '../../models/reportDate';

import * as _ from 'lodash';

@Component({
    templateUrl: 'manager.html'
})
export class ManagerPage implements OnInit{
    manager: string = "roomList";
    isAndroid: boolean = false;
    private count:number = 1;
    private count1:number = 1;
    private mentorooms: Mentoroom[] = [];
    private users: User[] = [];
    private reports = [];
    private selectedUser = [];
    private selectedSearchedUser = [];
    private selectedRoom = '';

    selectedAllUser: boolean = false; //사용자관리 전체선택
    selectedAllSearchedUser: boolean = false; // 검색된 사용자관리 전체선택
    selectedAllReport: boolean = false; //보고서목록 전체선택

    selectDefualtAuth: number = 1;
    selectDefualtYear: number = 20172;
    private mentoroomInfo: MentoroomInfo; //멘토방 설정
    // private reportDates: ReportDate[] = []; // 보고서 설정
    USERID: number;
    USERNAME: string;
    USERAUTH: number;
    private currentUser;
    private roomListChecked: boolean[] = [];

    // 엑셀 데이터
    public result: any;

    // 검색
    private searchUsername: string = '';
    private searchedUsers: User[] = [];
    private searchRoomname: string = '';
    private searchedRooms: Mentoroom[] = [];

    // reportData init
    range: number
    
    constructor(
        private mentoroomService: MentoroomService, 
        private adminService: AdminService, 
        private xlsxToJsonService: XlsxToJsonService,
        public modalCtrl: ModalController, 
        public navCtrl: NavController, 
        public platform: Platform, 
        public alertCtrl: AlertController, 
        public toastCtrl: ToastController,
        public viewCtrl: ViewController,
        public app: App,
    ) {
        this.isAndroid = platform.is('android');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
    }

    ngOnInit() {
        this.getMentoRoomInfo();
        this.getMentoroomListByYear(20172);
        this.userList(0);
        this.reportList(20172);
    }

    changeRange(index) {
        this.range = _.range(index)
    }
    /**
     *  멘토방 설정
     */

    // 멘토방 설정시킨 것 불러오기
    getMentoRoomInfo() {
        this.adminService.getMentoRoomInfo()
            .then(mentoroomInfo => {
                this.mentoroomInfo = mentoroomInfo
                this.mentoroomInfo.meeting_number = Number(this.mentoroomInfo.meeting_number)
                this.range = _.range(this.mentoroomInfo.meeting_number)
            })
    }

    // 멘토방 설정 저장
    mentoRoomInfoSave() {
        try {
            this.adminService.createMentoRoomInfo(this.mentoroomInfo)
                .then(() => this.Toast('멘토방 설정이 저장 되었습니다.'));
            // this.adminService.
        }
        catch(e) {
            this.Toast('에러 발생')
        }
    }

    // 멘토방 검색
    roomSearch(event) {
        this.selectedRoom = '';
        this.searchedRooms = _.filter(this.mentorooms, (room) => {
            if( room.mento_name.indexOf(this.searchRoomname) > -1) {
                return room;
            }
        });
    }

    // 멘토방 선택
    handleSelectedRoom(e, room_id) {
        if(e.checked) {
            this.selectedRoom = room_id
        } else {
            this.selectedRoom = ''
        }
    }

    Toast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top',
        });
        toast.present();
    }

    /**
     *  사용자 함수
     */
    // 사용자 리스트 불러오기
    userList(e) {
        this.selectedUser = [];
        this.selectedAllUser = false;
        this.selectedSearchedUser = [];
        this.selectedAllSearchedUser = false;
        this.adminService.userList(e)
            .then(users => this.users = users)
    }

    // 사용자 선택
    handleSelectedUser(e, user_id) {
        if(e.checked) {
            this.selectedUser.push(user_id)
        } else {
            let index = this.selectedUser.indexOf(user_id)
            this.selectedUser.splice(index, 1)
        }
    }

    // 사용자 선택 전체
    handleSelectedAllUser(e) {
        this.selectedAllUser = !this.selectedAllUser; 

        if(e.checked) {
            this.selectedUser = _.map(this.users, (e) => e.user_id)
        } else {
            this.selectedUser = [];
        }
    }

    // 사용자 검색
    userSearch(event) {
        this.selectedUser = [];
        this.selectedAllUser = false;
        this.selectedSearchedUser = [];
        this.selectedAllSearchedUser = false;
        this.searchedUsers = _.filter(this.users, (user) => {
            if( user.user_name.indexOf(this.searchUsername) > -1) {
                return user;
            }
        });
    }

    // 검색된 사용자 선택
    handleSelectedSearchedUser(e, user_id) {
        if(e.checked) {
            this.selectedSearchedUser.push(user_id)
        } else {
            let index = this.selectedSearchedUser.indexOf(user_id)
            this.selectedSearchedUser.splice(index, 1)
        }
    }

    // 검색된 사용자 선택 전체
    handleSelectedAllSearchedUser(e) {
        this.selectedAllSearchedUser = !this.selectedAllSearchedUser;

        if(e.checked) {
            this.selectedSearchedUser = [];
            this.selectedSearchedUser = _.map(this.searchedUsers, (e) => e.user_id)
        } else {
            this.selectedSearchedUser = [];
        }
    }

    getMentoroomListByYear(e){
        this.searchedRooms = [];
        this.searchRoomname = '';
        this.selectedRoom = '';
        this.mentoroomService.getMentoroomListByYear(e)
            .then(mentoroom => this.mentorooms = mentoroom);
    }


    /**
     *  보고서
     */

    reportList(year: number) {
        this.adminService.reportList(year)
            .then(reports => {
                console.log(reports)
                this.reports = reports
            })
            .catch(() => {
                this.Toast('error')
            })
    }

    /**
     *  아이오닉
     */
    openHomePage() {
        this.navCtrl.setRoot(HomePage);
    }

    openRoomDetail(selectedRoom) {
        this.navCtrl.push(RoomDetailPage, {
            selectedRoom: selectedRoom
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
                            this.adminService.updateEmpowerUser(uid)
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
                            this.adminService.updateLeaveUser(uid)
                        }
                        this.Toast('관리자 권한이 해제되었습니다');
                    }
                }
            ]
        });
        alert.present();
    }

    openMessagePage() {
        this.navCtrl.push(MessageAddPage, {
            selectedUser: this.selectedUser
        })
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
                        this.Toast('보고서가 삭제되었습니다.');
                    }
                }
            ]
        });
        alert.present();
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
                      this.Toast('보고서가 다운로드 되었습니다.');
                  }
                }
            ]
        });
        alert.present();
    }

    addSurvey(){
        if(this.count <= 4) {
            this.count += 1;
        } else {
            this.showAlert('더이상 추가할 수 없습니다.');
        }
    }

    addSurvey1(){
        if(this.count1 <= 2) {
            this.count1 += 1;
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

    minusSurvey1(){
        if(this.count1 > 0) {
            this.count1 -= 1;
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
        if(this.selectedRoom) {
            this.adminService.removeRoom(this.selectedRoom)
                .then(() => console.log('remove id: ' + this.selectedRoom))
            this.selectedRoom = ''
            setTimeout(() => { 
                this.app.getRootNav().setRoot(ManagerPage);
            }, 300);
            this.Toast('선택한 멘토방이 삭제되었습니다.')
        } else {
            this.Toast('삭제할 방을 선택해주세요.')
            this.app.getRootNav().setRoot(ManagerPage);
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    // 엑셀 업로드 아직 대충 구현함
    handleFile(event) {
        let file = event.target.files[0];
            this.xlsxToJsonService.processFileToJson({}, file)
                .subscribe(data => {
                    data = _.map(data['sheets']['신입생등록'], (student) => {
                        student['주전공'] = this.changeMajor(student['주전공'])
                        student['부전공/복수전공'] = this.changeMinor(student['부전공/복수전공'])
                        console.log(student)
                        return student;
                    })
                    this.result = JSON.stringify(data)
                })
    }

    // 주 전공 변환
    changeMajor(major) {
        switch(major) {
            case '소프트웨어공학과':
                return 1;
        }
    }
    // 부 전공 / 복수 전공 변환
    changeMinor(minor) {
        switch(minor) {
            case '소프트웨어공학과':
                return 1;
            case '경영학과':
                return 2;
            case '없음':
                return 0;
        }
    }
}

