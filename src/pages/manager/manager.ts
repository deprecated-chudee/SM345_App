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

//설문조사
import { SurveyService } from '../../services/survey.service';
import { SurveySubject } from '../../models/surveySubject';
import { SurveyObject } from '../../models/surveyObject';

import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import { read } from 'xlsx';

@Component({
    templateUrl: 'manager.html'
})
export class ManagerPage implements OnInit{
    manager: string = "roomList";
    isAndroid: boolean = false;
    private count:number = 1;
    private count1:number = 1;

    //설문조사
    // private surveyObjs: SurveyObject[] = [];
    // private surveySubjs: SurveySubject[] = [];
    private object_question: string[] = []; //객관식 설문조사 질문 내용들 배열
    private subject_question: string[] = []; //주관식 설문조사 질문 내용들 배열

    // 로컬 스토리지
    USERID: number;
    USERNAME: string;
    USERAUTH: number;
    private currentUser;

    // 멘토방 설정
    private mentoroomInfo: MentoroomInfo; 

    // 멘토방
    private mentorooms: Mentoroom[] = [];
    private selectedRoom = '';
    private searchRoomname: string = '';
    private searchedRooms: Mentoroom[] = [];

    // 사용자
    private users: User[] = [];
    private selectedUser = [];
    private selectedSearchedUser = [];
    private selectedAllUser: boolean = false; //사용자관리 전체선택
    private selectedAllSearchedUser: boolean = false; // 검색된 사용자관리 전체선택
    private searchUsername: string = '';
    private searchedUsers: User[] = [];

    // 보고서
    private reports = [];
    private selectedReport = [];
    private selectedReportData = [];
    private selectedSearchedReport = [];
    private selectedSearchedReportData = [];
    private selectedAllReport: boolean = false; //보고서목록 전체선택
    private selectedAllSearchedReport: boolean = false; 
    private searchReportname: string = '';
    private searchedReports = [];
    // private reportDates: ReportDate[] = []; // 보고서 설정

    selectDefualtAuth: number = 0;
    selectDefualtYear: number = 20172;
    
    // 엑셀 데이터
    public result: any;

    // 멘토방 report 설정
    range: number;
    private reportDateList: ReportDate[] = [];
    
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
        private surveyService: SurveyService,
    ) {
        this.isAndroid = platform.is('android');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
    }

    ngOnInit() {
        this.getMentoRoomInfo();
        this.getMentoroomListByYear(this.selectDefualtYear);
        this.userList(this.selectDefualtAuth);
        this.reportList(this.selectDefualtYear);
        this.getReportList();
    }


    //관리자 - 객관식 설문조사 저장
    createSurveyObj() {
        console.log('object: ' + this.object_question);
        this.surveyService.createSurveyObj(this.object_question);
        this.Toast('설문 등록이 완료되었습니다.');
    }

    //관리자 - 주관식 설문조사 저장
    createSurveySubj() {
        console.log('subject: ' + this.subject_question);
        this.surveyService.createSurveySubj(this.subject_question);
    }
    
    /**
     *  멘토방 설정
     */

    // 보고서 제출 기한 핸들러
    changeRange(index: number) {
        this.reportDateList = [];
        for (let i = 0; i < index; i++) {
            this.reportDateList.push(new ReportDate())
        }
        this.mentoroomInfo.meeting_number = index;
        this.range = _.range(index);
    }

    // 멘토방 설정 불러오기
    getMentoRoomInfo() {
        this.adminService.getMentoRoomInfo()
            .then(mentoroomInfo => {
                this.mentoroomInfo = mentoroomInfo
                this.mentoroomInfo.meeting_number = Number(this.mentoroomInfo.meeting_number)
                this.range = _.range(this.mentoroomInfo.meeting_number)
            })
    }

    // 멘토방 설정 저장
    mentoroomInfoSave() {
        try {
            this.adminService.createMentoRoomInfo(this.mentoroomInfo);
            this.createReportList();
            this.Toast('멘토방 설정이 저장 되었습니다.');
        }
        catch(e) {
            this.Toast('에러 발생')
        }
    }

    // 리포트 날짜 리스트 불러오기
    getReportList() {
        try {
            this.adminService.getReportList()
                .then(reportDateList => this.reportDateList = reportDateList);
        }
        catch(e) {
            this.Toast('에러 발생')
        }
    }

    // 리포트 날짜 리스트 저장하기
    createReportList() {
        try {
            this.adminService.createReportList(this.reportDateList);
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
            position: 'bottom',
        });
        toast.present();
    }

    /**
     *  사용자 함수
     */
    // 사용자 리스트 불러오기
    userList(e) {
        this.searchedUsers = [];
        this.selectedUser = [];
        this.selectedAllUser = false;
        this.selectedSearchedUser = [];
        this.selectedAllSearchedUser = false;
        this.adminService.userList(e)
            .then(users => this.users = users)
            .catch(() => this.Toast('error'))
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

    // 멘토방 리스트 불러오기
    getMentoroomListByYear(e){
        this.searchedRooms = [];
        this.searchRoomname = '';
        this.selectedRoom = '';
        this.mentoroomService.getMentoroomList()
            .then(mentorooms => this.mentorooms = mentorooms)
        // this.mentoroomService.getMentoroomListByYear(e) 2017년 도 껄로 뽑으면 사진이 안들어가있음
        //     .then(mentoroom => {
        //         this.mentorooms = mentoroom
        //         console.log(this.mentorooms)
        //     });
    }


    /**
     *  보고서
     */

    // 보고서 리스트 불러오기
    reportList(year: number) {
        this.searchedReports = [];
        this.selectedReport = [];
        this.selectedAllReport = false;
        this.selectedSearchedReport = [];
        this.selectedSearchedReportData = [];
        this.selectedAllSearchedReport = false;
        this.adminService.reportList(year)
            .then(reports => this.reports = reports)
            .catch(() => this.Toast('error'))
    }

    // 보고서 선택
    handleSelectedReport(e, r) {
        if(e.checked) {
            this.selectedReport.push(r.id)
            this.selectedReportData.push([r.id, r.file_name, r.file_data, r.file_type])
        } else {
            let index = this.selectedReport.indexOf(r.id)
            this.selectedReport.splice(index, 1)
            this.selectedReportData.splice(index, 1)
        }
    }

    // 보고서 전체 선택
    handleSelectedAllReport(e) {
        this.selectedAllReport = !this.selectedAllReport; 

        if(e.checked) {
            this.selectedReport = _.map(this.reports, (e) => e.id)
            this.selectedReportData = _.map(this.reports, (e) => [e.id, e.file_name, e.file_data, e.file_type])
        } else {
            this.selectedReport = [];
            this.selectedReportData = [];
        }
    }

    // 보고서 검색
    reportSearch(event) {
        this.selectedReport = [];
        this.selectedReportData = [];
        this.selectedAllReport = false;
        this.selectedSearchedReport = [];
        this.selectedSearchedReportData = [];
        this.selectedAllSearchedReport = false;
        this.searchedReports = _.filter(this.reports, (report) => {
            if(report.team_name.indexOf(this.searchReportname) > -1) {
                return report;
            }
        });
    }

    // 검색된 보고서 선택
    handleSelectedSearchedReport(e, r) {
        if(e.checked) {
            this.selectedSearchedReport.push(r.id)
            this.selectedSearchedReportData.push([r.id, r.file_name, r.file_data, r.file_type])
        } else {
            let index = this.selectedSearchedReport.indexOf(r.id)
            this.selectedSearchedReport.splice(index, 1)
            this.selectedSearchedReportData.splice(index, 1)
        }
    }

    // 검색된 보고서 전체 선택
    handleSelectedAllSearchedReport(e) {
        this.selectedAllSearchedReport = !this.selectedAllSearchedReport;

        if(e.checked) {
            this.selectedSearchedReport = _.map(this.searchedReports, (e) => e.id)
            this.selectedSearchedReportData = _.map(this.searchedReports, (e) => [e.id, e.file_name, e.file_data, e.file_type])
        } else {
            this.selectedSearchedReport = [];
            this.selectedSearchedReportData = [];
        }
    }

    // 보고서 다운로드
    download(name, data, type) {
        let binary = atob(data);
        var byteArray = new Uint8Array(new ArrayBuffer(binary.length));
        for (var i = 0; i < binary.length; i++) byteArray[i] = binary.charCodeAt(i);
        let blob = new Blob([byteArray], {type: type})
        FileSaver.saveAs(blob, name)
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

    showReportDeleteAlert(reports) {
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
                        try {
                            reports.forEach(e => this.adminService.reportRemove(e))
                            this.Toast('보고서가 삭제되었습니다.');
                            this.navCtrl.setRoot(ManagerPage);
                        }
                        catch(e){
                            this.Toast(e);
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    showReportDownloardAlert(reports) {
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
                        try {
                            reports.forEach(e => this.download(e[1], e[2], e[3]));
                            this.Toast('보고서가 다운로드 되었습니다.');
                        }
                        catch(e) {
                            this.Toast(e);
                        }
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
    //멘토방 폐설
    handleDeleteRoom(room_id) {
        this.adminService.mentoroom_close(room_id)
        this.app.getRootNav().setRoot(ManagerPage);
        
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    // 엑셀 업로드 아직 대충 구현함
    handleFile(event) {
        let file = event.target.files[0];
            this.xlsxToJsonService.processFileToJson({}, file)
                .subscribe(data => {
                    data = _.map(data['sheets']['신입생목록'], (student) => {
                        student.student_major = this.changeMajor(student.student_major)
                        student.student_minor = this.changeMinor(student.student_minor)
                        console.log(student)
                        return {
                            student_id: student['학번'],
                            student_major: student['학과'],
                            student_minor: student['복수/부전공'],
                            student_name: student['이름'],
                            student_email: student['이메일'],
                            student_number: student['주민번호'],
                            student_phone: student['휴대폰'],
                          }
                    })
                    this.result = JSON.stringify(data)
                
                this.result = JSON.stringify(data)
                console.log(this.result);
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
            case '영어학과':
                return 5;
            case '-':
                return 0;
            case '경영학부':
                return 11;
        }
    }

    // 신입생 엑셀 등록
    excelEnter() {
        if(this.result) {
            this.adminService.excelEnter(this.result)
                .then(() => {
                    this.Toast('신입생 등록이 완료 되었습니다.')
                })
                .catch(() => {
                    this.Toast('Error')
                })
        } else {
            this.Toast('파일이 없습니다.')
        }
    }
}

