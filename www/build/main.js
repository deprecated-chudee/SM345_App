webpackJsonp([0],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
        // private URL = 'http://localhost:8085/sm345/api/';
        this.URL = 'http://220.230.112.31:8081/sm345/api/';
    }
    MessageService.prototype.messageList = function (user_id) {
        var url = this.URL + 'message/' + user_id;
        return this.http.post(url, null)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MessageService.prototype.getUsername = function (u_id) {
        var url = this.URL + 'message/username/' + u_id;
        return this.http.post(url, null)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MessageService.prototype.createMessage = function (message) {
        var url = this.URL + 'message/create';
        return this.http.post(url, message)
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    MessageService.prototype.removeMessage = function (m_id) {
        var url = this.URL + 'message/' + m_id + '/delete';
        return this.http.post(url, m_id)
            .toPromise()
            .then()
            .catch(this.handleError);
    };
    MessageService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return MessageService;
}());
MessageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MessageService);

//# sourceMappingURL=message.service.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__smEdit_smEdit__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SmPage = (function () {
    function SmPage(alertCtrl, navCtrl, modalCtrl, serverService) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.articles = [];
        this.serverService = serverService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERAUTH = this.currentUser.USERAUTH;
    }
    SmPage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getList(1).then(function (article) {
            _this.articles = article;
        });
    };
    SmPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    SmPage.prototype.OpenSmEditPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__smEdit_smEdit__["a" /* SmEditPage */]);
        modal.present();
    };
    //삭제하시겠습니까? 알림
    SmPage.prototype.showEditDelete = function () {
        var confirm = this.alertCtrl.create({
            title: '삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: function () {
                    }
                },
                {
                    text: '삭제하기',
                    handler: function () {
                        console.log('삭제');
                    }
                }
            ]
        });
        confirm.present();
    };
    return SmPage;
}());
SmPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/sm/sm.html"*/'<ion-header class="header-sm">\n<ion-navbar>\n  <button ion-button menuToggle>\n    <ion-icon name="menu"></ion-icon>\n  </button>\n  <div class="home_logo_wrapper" (click)="openHomePage()">\n    <img src="assets/img/Logo2.png" class="home-logo"/>\n  </div>\n  <ion-buttons end> <!-- 네비게이션 바에 가장 오른쪽에 만들겠다는 뜻 -->\n    <button ion-button icon-only (click)="OpenSmEditPage()" *ngIf="USERAUTH == 3">\n        <ion-icon name=\'md-create\'></ion-icon>\n    </button>\n  </ion-buttons>\n</ion-navbar>\n</ion-header>\n\n<ion-content class="page-sm">\n    <ion-list>\n        <div  *ngFor="let a of articles">\n            <ion-list-header>\n                    {{a.article_title}}\n                    <ion-icon item-end name="md-trash" (click)="showEditDelete()"></ion-icon>           \n            </ion-list-header>\n            <div padding id="commentDiv">\n                    {{a.article_content}}\n            </div>   \n        </div>\n\n        <!--\n        <ion-list-header>\n                장학금 지급 기준                \n        </ion-list-header>\n        <div padding>\n            <ul>\n                <li>1차 보고서 이후 1차장학금(10만원)을 지급한다.</li>\n                <li>2차 보고서 이후 활동한 내역, 인증샷 등을 참고하여 2차 장학금(15만원)을 지급한다.</li>\n                <li>활동 내역 중 인증샷이 없을 경우 무효 처리한다.</li>\n                <li>이 때, 인증샷은 조원, 조장 모두 포함되어 있어야 하며 불가피한 사유가 있을 경우 인증샷에  없더라도 인증샷으로 인정한다.</li>\n            </ul>\n        </div>\n        \n        <ion-list-header>\n                추가장학금 지급 기준                \n        </ion-list-header>\n        <div padding>\n            <ul>\n                <li>멘토가 팀별 주제를 계획한 것을 계획서에 적어 증명자료와 함께 제출한다.</li>\n                <li>학생회에서 멘토 계획서를 검토 후 멘토로 선정한다.</li>\n                <li>1학년 과정지도 수업에서 학생회가 참여하여 팀별 주제 발제 후 1학년이 원하는 팀으로 참여한다. (1학년 필수 참여)</li>\n                <li>2학년의 경우 카톡으로 공지 후 개인적으로 연락한다. (2학년 선택 참여)</li>\n                <li>인원 분배의 경우 가위바위보를 통하여 선정한다.</li>\n            </ul>\n        </div> \n\n        <ion-list-header>\n                멘토 기준                \n        </ion-list-header>\n        <div padding>\n            <ul>\n                <li>C언어, 이산수학, java, 데이터베이스개론의 경우 해당 과목 성적이 B+ 이상이어야 한다.</li>\n                <li>그 외의 주제의 경우 본인이 전문 지식을 가르칠 수준이라는 것을 증빙할 수 있는 자료(활동 자료 등)가 필요하다.</li>\n            </ul>\n        </div> \n\n        <ion-list-header>\n                팀별 스터디                \n        </ion-list-header>\n        <div padding>\n            <ul>\n                <li>1학년 : 이산수학, C프로그래밍, 문서작성(PPT 등), 보안, html</li>\n                <li>2학년 : java, 데이터베이스개론, html, 보안</li>\n                <li>지정된 주제 외에도 선택할 수 있지만 스터디라는 명목에서 벗어난다고 판단될 경우 멘토에서 제외한다.</li>\n                <li>1차 보고서 제출 시 팀 별 과제 중간 보고서 함께 제출한다.</li>\n                <li>2차 보고서 제출 시 팀 별 과제 최종 보고서 함께 제출한다.</li>\n                <li>중간 보고서 미 제출 시 활동비, 장학금을 지급하지 않는다.</li>\n            </ul>\n        </div> \n\n        <ion-list-header>\n                멘티 선택 항목 (2가지 중 1가지는 반드시 해야 함)                \n        </ion-list-header>\n        <div padding>\n            <ul>\n                <li>컨퍼런스를 1학기 1회 이상 참여한다.</li>\n                <li>학생회 사업을 2회 이상 참여한다. (개강파티, 해오름제, 과 MT, 대동제, 종강파티)</li>\n            </ul>\n        </div> \n\n        <ion-list-header>\n                사업 일정                \n        </ion-list-header>\n        <div padding>\n            <ul>\n                <li>3월 2일 : 1차 면담</li>\n                <li>3월 3일 ~ 3월 5일 : 2학년 멘티 신청받기</li>\n                <li>월 7일 ~ 3월 8일 : 2차, 3차 면담</li>\n                <li>3월  9일 ~ 3월 12일 : 멘토 신청받기</li>\n                <li>3월 13일 : 4차 면담 및 심사</li>\n                <li>3월 14일 : 팀 선별 (1학년 과정지도1, 2학년 카톡으로 공지)</li>\n                <li>3월 15일 ~ 4월 19일 : 1차 활동기간 (총 6주간, 최소 12시간)</li>\n                <li>4월 15일 ~ 4월 19일 : 1차 보고서 및 중간 보고서 제출</li>\n                <li>4월 20일 : 1차 장학금 지급</li>\n                <li>4월 24일 ~ 5월 29일 : 2차 활동기간 (총 6주간, 최소 12시간)</li>\n                <li>5월 25일 ~ 5월 29일 : 2차 보고서 및 최종 보고서 제출</li>\n                <li>종강이후 : 2차 장학금 지급</li>\n                <li>학교 일정상 성적 확인 후 추가 장학금 지급</li>\n            </ul>\n        </div> \n    -->\n\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/sm/sm.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__app_server_service__["a" /* ServerService */]])
], SmPage);

//# sourceMappingURL=sm.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__room_room__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_server_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_mentoroom__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RoomDetailPage = (function () {
    function RoomDetailPage(app, toastCtrl, serverService, navParams, appCtrl, viewCtrl) {
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.appCtrl = appCtrl;
        this.viewCtrl = viewCtrl;
        this.mentoroom_id = this.navParams.get("mentoroom_id");
        this.serverService = serverService;
        this.mentoroom = new __WEBPACK_IMPORTED_MODULE_4__models_mentoroom__["a" /* Mentoroom */]("", "", "", 0, "", 0, 0, 0);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
    }
    RoomDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getMentoroom(this.mentoroom_id).then(function (mentoroom) {
            _this.mentoroom = mentoroom;
        });
    };
    RoomDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RoomDetailPage.prototype.openRoomPage = function () {
        this.appCtrl.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__room_room__["a" /* RoomPage */]);
        this.viewCtrl.dismiss();
    };
    RoomDetailPage.prototype.confirm = function (mentoroom) {
        var _this = this;
        this.serverService.confirmMentoroom(mentoroom);
        this.Toast('개설이 완료되었습니다');
        setTimeout(function () {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__room_room__["a" /* RoomPage */]);
        }, 300);
        this.dismiss();
    };
    RoomDetailPage.prototype.reject = function () {
        var _this = this;
        this.serverService.rejectMentoroom(this.mentoroom_id);
        this.Toast('개설이 반려되었습니다');
        setTimeout(function () {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__room_room__["a" /* RoomPage */]);
        }, 300);
        this.dismiss();
    };
    RoomDetailPage.prototype.Toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    return RoomDetailPage;
}());
RoomDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/roomDetail/roomDetail.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-title>[{{mentoroom.team_name}}] 멘토방</ion-title> \n        <ion-buttons end>\n            <button ion-button (click)="dismiss()">\n                <span ion-text><ion-icon name="close"></ion-icon></span>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding class="page-roomDetail">\n    <table class="roomDetailTable">\n        <tr>\n            <td rowspan="7"><img src="assets/img/book/python.png" /></td>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td><b>멘토 : </b>{{mentoroom.mento_name}}</td>\n        </tr>\n        <tr>\n            <td><b>팀명 : </b>{{mentoroom.team_name}}</td>\n        </tr>\n        <tr>\n            <td><b>주제 : </b>{{mentoroom.team_theme}}</td>\n        </tr>\n        <tr>\n            <td><b>현재팀원 : </b>1명</td>\n        </tr>\n        <tr>\n            <td><b>자격증명 파일 : </b><button ion-button class="fileButton">다운로드</button></td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n    </table>\n\n    <ion-list-header>\n            팀 소개 및 설명                \n    </ion-list-header>\n    <ion-icon name="logo-youtube" class="youtube-icon"></ion-icon><span class="youtube-span">팀 소개 영상보기</span>\n    <div padding class="teamInfo">{{mentoroom.team_about}}\n    </div>\n\n    <!--멘토/관리자 인터페이스-->\n    <div class="noAlarm" *ngIf= "USERAUTH == 1 || USERAUTH == 3">\n    <ion-list-header>\n            모임 결과보고서            \n    </ion-list-header>\n    <table class="reportTable">\n            <tr>\n                <td>3차 모임 결과보고서</td>\n                <td rowspan="2"><ion-icon name="md-download"></ion-icon></td>\n                <td rowspan="2" class="report-ing">확인중</td>\n            </tr>\n            <tr>\n                <td><span class="reportTime">2017-10-04</span></td>\n            </tr>\n    </table>\n    <table class="reportTable">\n            <tr>\n                <td>3차 모임 결과보고서</td>\n                <td rowspan="2"><ion-icon name="md-download"></ion-icon></td>\n                <td rowspan="2" class="report-reject">반려</td>\n            </tr>\n            <tr>\n                <td><span class="reportTime">2017-09-20</span></td>\n            </tr>\n    </table>\n    <table class="reportTable">\n            <tr>\n                <td>2차 모임 결과보고서</td>\n                <td rowspan="2"><ion-icon name="md-download"></ion-icon></td>\n                <td rowspan="2" class="report-end">확인<br/>완료</td>\n            </tr>\n            <tr>\n                <td><span class="reportTime">2017-09-20</span></td>\n            </tr>\n    </table>\n    <table class="reportTable">\n            <tr>\n                <td>1차 모임 결과보고서</td>\n                <td rowspan="2"><ion-icon name="md-download"></ion-icon></td>\n                <td rowspan="2" class="report-end">확인<br/>완료</td>\n            </tr>\n            <tr>\n                <td><span class="reportTime">2017-09-20</span></td>\n            </tr>\n    </table>\n    </div>\n\n    <!--멘토 인터페이스-->\n    <ion-item no-lines  *ngIf= "USERAUTH == 1">\n            <button ion-button class="teamOk" (click)="openRoomPage()">보고서 제출</button>\n    </ion-item>\n\n    <!--관리자 인터페이스-->\n    <ion-item no-lines  *ngIf= "USERAUTH == 3 && mentoroom.team_confirm == 0" >\n        <button ion-button class="teamOk" (click)="confirm(mentoroom)">개설승낙</button>\n        <button ion-button class="teamNo" (click)="reject()">개설거절</button>\n    </ion-item>\n\n\n    <!--멘티 인터페이스-->\n    <!--\n    <button ion-button block class="menteeButton" (click)="showMenteeAlert()">멘티신청</button>\n    -->\n\n    <!--멘티 인터페이스-->\n    <!--\n    <button ion-button block class="menteeButton" (click)="showMenteeAlert()">멘티신청취소</button>\n    -->\n    \n    <!--멘토/멘티 인터페이스-->\n    <!--\n    <ion-list-header>\n            설문조사                \n    </ion-list-header>\n    <div class="poll">\n        <b>Q1.</b> 멘토링 활동에 만족하셨나요?\n    </div>\n    <ion-item>\n      <ion-range min="1" max="5" pin="true" step="1" snaps="true">\n        <ion-icon range-left name="md-sad"></ion-icon>\n        <ion-icon range-right name="md-happy"></ion-icon>\n      </ion-range>\n    </ion-item>\n\n    <div class="poll">\n        <b>Q2.</b> 성실히 참여했나요?\n    </div>\n    <ion-item>\n      <ion-range min="1" max="5" pin="true" step="1" snaps="true">\n        <ion-icon range-left name="md-sad"></ion-icon>\n        <ion-icon range-right name="md-happy"></ion-icon>\n      </ion-range>\n    </ion-item>\n\n    <div class="poll">\n        <b>Q3.</b> 다음에 또 멘토링 활동에 참여하고 싶은가요?\n    </div>\n    <ion-item>\n      <ion-range min="1" max="5" pin="true" step="1" snaps="true">\n        <ion-icon range-left name="md-sad"></ion-icon>\n        <ion-icon range-right name="md-happy"></ion-icon>\n      </ion-range>\n    </ion-item>\n\n    <ion-item no-lines>\n            <button ion-button class="teamOk" (click)="openRoomPage()">설문 완료</button>\n    </ion-item>\n-->\n    \n</ion-content>\n'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/roomDetail/roomDetail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], RoomDetailPage);

//# sourceMappingURL=roomDetail.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ServerService = ServerService_1 = (function () {
    function ServerService(http) {
        this.http = http;
        //private URL = 'http://localhost:8086/sm345/api/';
        this.URL = 'http://220.230.112.31:8081/sm345/api/';
        console.log(ServerService_1.USERID);
        console.log(ServerService_1.USERAUTH);
        console.log(ServerService_1.USERNAME);
    }
    ServerService.prototype.makeLogin = function (user) {
        var url = this.URL + 'login';
        return this.http.post(url, user)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.getLoginrecord = function (user_id) {
        var url = this.URL + 'login_record/' + user_id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.updatePassword = function (user) {
        var url = this.URL + 'updatepassword';
        return this.http.post(url, user)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.createMentoroom = function (mentoroom) {
        var url = this.URL + 'mentoroom/create';
        return this.http.post(url, mentoroom)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.getMentoroomListByYear = function (year) {
        var url = this.URL + 'mentoroom/' + year + '/1';
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.getMentoroomList = function () {
        var url = this.URL + 'mentoroom';
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.getList = function (board_id) {
        var url = this.URL + 'list/' + board_id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.getArticle = function (board_id, id) {
        var url = this.URL + 'list/' + board_id + '/' + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.creatArticle = function (article) {
        var url = this.URL + 'list/create/' + article.board_id;
        return this.http.post(url, article)
            .toPromise()
            .catch(this.handleError);
    };
    ServerService.prototype.deleteArticle = function (id, board_id) {
        var url = this.URL + 'list/' + board_id + '/' + id + '/delete';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    };
    /*
       createComment(comment: Comment){
        let url = this.URL + 'mentoroom/3/' + comment.article_id + '/comment/create';
        return this.http.post(url, comment)
            .toPromise()
            .catch(this.handleError);
      }
      */
    ServerService.prototype.getMentoroom = function (mentoroom_id) {
        var url = this.URL + 'mentoroom/' + mentoroom_id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServerService.prototype.confirmMentoroom = function (mentoroom) {
        var url = this.URL + 'mentoroom/' + mentoroom.mentoroom_id + '/confirm';
        return this.http.post(url, mentoroom)
            .toPromise()
            .catch(this.handleError);
    };
    ServerService.prototype.rejectMentoroom = function (mentoroom_id) {
        var url = this.URL + 'mentoroom/' + mentoroom_id + '/reject';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    };
    ServerService.prototype.updateEmpowerUser = function (user_id) {
        var url = this.URL + 'admin/empower/' + user_id;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    };
    ServerService.prototype.updateLeaveUser = function (user_id) {
        var url = this.URL + 'admin/leave/' + user_id;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    };
    ServerService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    //멘토방설정 저장
    ServerService.prototype.createMentoRoomInfo = function (mentoRoomInfo) {
        var url = this.URL + 'admin/room_info/edit';
        return this.http.post(url, mentoRoomInfo)
            .toPromise()
            .then()
            .catch(this.handleError);
    };
    //멘토방 설정 불러오기
    ServerService.prototype.getMentoRoomInfo = function () {
        var url = this.URL + 'admin/room_info';
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    return ServerService;
}());
ServerService = ServerService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ServerService);

var ServerService_1;
//# sourceMappingURL=server.service.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminService = (function () {
    function AdminService(http) {
        this.http = http;
        // private URL = 'http://localhost:8085/sm345/api/';
        this.URL = 'http://220.230.112.31:8081/sm345/api/';
    }
    AdminService.prototype.userList = function (auth) {
        var url = this.URL + 'admin/user/' + auth;
        return this.http.post(url, null)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AdminService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return AdminService;
}());
AdminService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], AdminService);

//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_sm_sm__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_notice_notice__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_question_question__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_room_room__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_manager_manager__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_message_message__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MyApp = (function () {
    function MyApp(toastCtrl, alertCtrl, serverService, modalCtrl, platform, statusBar, splashScreen) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.serverService = serverService;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'HOME', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'SM사업소개', component: __WEBPACK_IMPORTED_MODULE_6__pages_sm_sm__["a" /* SmPage */] },
            { title: '공지사항', component: __WEBPACK_IMPORTED_MODULE_7__pages_notice_notice__["a" /* NoticePage */] },
            { title: '멘토방', component: __WEBPACK_IMPORTED_MODULE_9__pages_room_room__["a" /* RoomPage */] },
            { title: 'Q&A', component: __WEBPACK_IMPORTED_MODULE_8__pages_question_question__["a" /* QuestionPage */] },
            { title: '관리페이지', component: __WEBPACK_IMPORTED_MODULE_10__pages_manager_manager__["a" /* ManagerPage */] },
        ];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.openMessage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__pages_message_message__["a" /* MessagePage */]);
        modal.present();
    };
    MyApp.prototype.openLogout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '로그아웃 하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: function (data) { }
                },
                {
                    text: '로그아웃',
                    handler: function (data) {
                        _this.presentLogoutToast('bottom');
                        localStorage.removeItem('currentUser');
                        window.location.reload();
                    }
                }
            ]
        });
        prompt.present();
    };
    MyApp.prototype.loginOpen = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
        modal.present();
    };
    MyApp.prototype.presentLogoutToast = function (position) {
        var toast = this.toastCtrl.create({
            message: '로그아웃 되었습니다.',
            duration: 3000,
            position: position,
        });
        toast.present();
    };
    MyApp.prototype.showPasswordAlert = function () {
        var prompt = this.alertCtrl.create({
            title: '비밀번호 변경',
            inputs: [
                {
                    name: 'password',
                    type: 'password',
                    placeholder: '기존 비밀번호',
                },
                {
                    name: 'newPassword',
                    type: 'password',
                    placeholder: '새 비밀번호',
                },
                {
                    name: 'newPasswordCheck',
                    type: 'password',
                    placeholder: '비밀번호 확인',
                }
            ],
            buttons: [
                {
                    text: '취소',
                    handler: function (data) { }
                },
                {
                    text: '확인',
                    handler: function (data) { }
                }
            ]
        });
        prompt.present();
    };
    MyApp.prototype.ngOnInit = function () {
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/app/app.html"*/'<ion-menu [content]="content">\n\n  \n\n<ion-content class="side">\n<section class="sideAccount">\n    <ion-item no-lines>\n      <button menuClose clear ion-button item-right>\n        <ion-icon name="ios-arrow-back" class="account-icon"></ion-icon>\n      </button>\n    </ion-item>\n  <table class="sideAccountTable">\n    <tr>\n      <td rowspan="2">\n        <img src="assets/img/user.png" width="50px"/>\n      </td>\n         <!--로그인 안했을 경우-->\n         <td *ngIf="currentUser == undefined" class="account_user" (click)="loginOpen()">로그인 해주세요</td>\n         \n          <!--로그인 했을 경우-->\n         <td *ngIf="currentUser != undefined" class="account_user"><b>{{currentUser.USERNAME}}</b></td>\n    </tr>\n    <tr>\n         <td *ngIf="currentUser != undefined" class="account_user"><b>{{currentUser.USERID}}</b></td>\n    </tr>\n  </table>\n\n  <ion-item no-lines>\n      <button menuClose clear ion-button item-right (click)="openLogout()">\n          <ion-icon name="md-log-out" class="account-icon"></ion-icon>\n      </button>\n      <button menuClose clear ion-button item-right (click)="openMessage()">\n        <ion-icon name="md-mail" class="account-icon"></ion-icon>\n      </button>\n      <button menuClose clear ion-button item-right (click)="showPasswordAlert()">\n        <ion-icon name="ios-apps" class="account-icon"></ion-icon>\n      </button>\n  </ion-item>\n</section>\n\n  <table class="sideTable">\n      <tr>\n        <td menuClose (click)="openPage(pages[0])"><img src="assets/img/home.png"/></td>\n        <td menuClose (click)="openPage(pages[0])">{{pages[0].title}}</td>\n      </tr>\n      <tr>\n          <td menuClose (click)="openPage(pages[1])"><img src="assets/img/document.png"/></td>\n          <td menuClose (click)="openPage(pages[1])">{{pages[1].title}}</td>\n      </tr>\n      <tr>\n          <td menuClose (click)="openPage(pages[2])"><img src="assets/img/info.png"/></td>\n          <td menuClose (click)="openPage(pages[2])">{{pages[2].title}}</td>\n      </tr>\n      <tr>\n          <td menuClose (click)="openPage(pages[3])"><img src="assets/img/group.png"/></td>\n          <td menuClose (click)="openPage(pages[3])">{{pages[3].title}}</td>\n      </tr>\n      <tr>\n          <td menuClose (click)="openPage(pages[4])"><img src="assets/img/question.png"/></td>\n          <td menuClose (click)="openPage(pages[4])">{{pages[4].title}}</td>\n      </tr>\n      <tr *ngIf="currentUser != undefined && currentUser.USERAUTH == 3">\n          <td menuClose (click)="openPage(pages[5])"><img src="assets/img/setting.png"/></td>\n          <td menuClose (click)="openPage(pages[5])">{{pages[5].title}}</td>\n      </tr>\n    </table>\n\n\n  </ion-content>\n</ion-menu>\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/jess2/sm345_app/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_12__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sm_sm__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reading_reading__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notice_notice__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = HomePage_1 = (function () {
    function HomePage(navCtrl, serverService) {
        this.navCtrl = navCtrl;
        this.articles = [];
        this.serverService = serverService;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getList(2).then(function (article) {
            _this.articles = article;
        });
    };
    HomePage.prototype.openReadingPage = function (article) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__reading_reading__["a" /* ReadingPage */], { id: article.id, board_id: article.board_id,
        });
    };
    HomePage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(HomePage_1);
    };
    HomePage.prototype.openSmPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__sm_sm__["a" /* SmPage */]);
    };
    HomePage.prototype.openNoticePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__notice_notice__["a" /* NoticePage */]);
    };
    return HomePage;
}());
HomePage = HomePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div class="home_logo_wrapper" (click)="openHomePage()">\n      <img src="assets/img/Logo2.png" class="home-logo"/>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="page-home">\n  <!--sm사업 신청기간 -->\n  <table class="calendarText">\n    <tr>\n      <td colspan="2">\n          SCHEDULE\n      </td>\n    </tr>\n    <tr>\n        <td>\n          2017.09.01 ~ 09.10\n        </td>\n        <td>\n          2학기 멘토 신청기간\n        </td>\n      </tr>\n    <tr>\n      <td>\n        2017.09.11 ~ 09.20\n      </td>\n      <td>\n        2학기 멘티 신청기간\n      </td>\n    </tr>\n    <tr>\n        <td>\n          2017.09.21 ~ 12.10\n        </td>\n        <td>\n          멘토링 활동기간\n        </td>\n      </tr>\n    <tr>\n        <td>\n          2017.12.11 ~ 12.20\n        </td>\n        <td>\n          2학기 설문조사 기간\n        </td>\n    </tr>\n  </table>\n\n  <!--공지사항-->\n  <table class="noticeTable">\n      <tr>\n        <td colspan="2">\n            NOTICE\n        </td>\n      </tr>\n      <tr>\n          <ion-item no-lines class="notice" *ngFor="let a of articles" (click)="openReadingPage(a)">\n              <!--<span>-->\n                <ion-list>\n                 {{a.article_title}}\n                </ion-list>\n              </ion-item>\n              <ion-item>\n                <ion-list (click)="openNoticePage()">\n                    <ion-icon name="ios-add-circle-outline"></ion-icon><span class="more">더 보기</span>\n                </ion-list>\n              <!--</span>-->\n            </ion-item>\n      </tr>\n  </table>\n\n  <!--멘토방 사진 슬라이드-->\n  <table class="mentorTable">\n      <tr>\n        <td colspan="2">\n            MENTOR ROOM\n        </td>\n      </tr>\n  </table>\n  <table class="mentor-banner">\n      <tr>\n          <ion-slides pager loop="true" autoplay="5000" speed="500">\n              <ion-slide>\n                <table class="mentor-banner-in">\n                  <tr>\n                    <td>\n                      <img src="assets/img/book/algo.png" />\n                    </td>\n                    <td>\n                      <img src="assets/img/book/c.png" />\n                    </td>\n                    <td>\n                      <img src="assets/img/book/java.png" />\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>[주제] 알고리즘</td>\n                    <td>[주제] C언어</td>\n                    <td>[주제] JAVA</td>\n                  </tr>\n                </table>\n              </ion-slide>\n              <ion-slide>\n                <table class="mentor-banner-in">\n                  <tr>\n                    <td>\n                      <img src="assets/img/book/c.png" />\n                    </td>\n                    <td>\n                      <img src="assets/img/book/algo.png" />\n                    </td>    \n                    <td>\n                      <img src="assets/img/book/java.png" />\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>[주제] C언어</td>\n                    <td>[주제] 알고리즘</td>\n                    <td>[주제] JAVA</td>\n                  </tr>\n                </table>\n              </ion-slide>\n              <ion-slide>\n                <table class="mentor-banner-in">\n                  <tr>\n                    <td>\n                      <img src="assets/img/book/algo.png" />\n                    </td>\n                    <td>\n                      <img src="assets/img/book/java.png" />\n                    </td>\n                    <td>\n                      <img src="assets/img/book/c.png" />\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>[주제] 알고리즘</td>\n                    <td>[주제] JAVA</td>\n                    <td>[주제] C언어</td>\n                  </tr>\n                </table>\n              </ion-slide>\n             \n            </ion-slides>\n      </tr>\n  </table>\n\n    <!--설명서 바로가기-->\n    <table class="noticeTable">\n        <tr>\n          <td colspan="2">\n              DOCUMENT\n          </td>\n        </tr>\n        <tr>\n          <img src="assets/img/banner.png" class="document" (click)="openSmPage()"/>\n        </tr>\n    </table>\n</ion-content>\n'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__app_server_service__["a" /* ServerService */]])
], HomePage);

var HomePage_1;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_server_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_article__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sm_sm__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SmEditPage = (function () {
    function SmEditPage(app, toastCtrl, viewCtrl, serverService, navParams, alertCtrl) {
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.count = 1;
        this.board_id = this.navParams.get("board_id");
        this.serverService = serverService;
        this.article = new __WEBPACK_IMPORTED_MODULE_3__models_article__["a" /* Article */](0, 1, "", "", 0, 0, 0, "");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
    }
    SmEditPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SmEditPage.prototype.showAlert = function (ms) {
        var alert = this.alertCtrl.create({
            title: ms,
            buttons: ['OK'],
        });
        alert.present();
    };
    //사업설명서 추가 저장 버튼 누를 시
    SmEditPage.prototype.smWriteSubmit = function () {
        var _this = this;
        this.article.board_id = this.board_id;
        this.article.article_writer = this.USERID;
        this.serverService.creatArticle(this.article);
        this.presentToast('SM사업 설명이 추가되었습니다.');
        setTimeout(function () {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__sm_sm__["a" /* SmPage */]);
        }, 300);
        this.dismiss();
        //this.navCtrl.pop();
    };
    SmEditPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message.title,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    return SmEditPage;
}());
SmEditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/smEdit/smEdit.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-buttons left>\n            <button ion-button (click)="dismiss()">\n                    <span ion-text><ion-icon name="ios-close-circle-outline"></ion-icon></span>  \n            </button>\n        </ion-buttons>\n        <ion-title>SM사업소개 수정</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="smWriteSubmit()">\n                <span ion-text><ion-icon name="ios-checkmark-circle-outline"></ion-icon></span>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="page-smEdit">\n        <div class="addBox">\n            <ion-item>\n                <ion-label>제목</ion-label>\n                <ion-input type="text" placeholder="제목을 입력해주세요." [(ngModel)]="article.article_title"></ion-input>\n\n            </ion-item>\n            <ion-item>\n                <ion-label>내용</ion-label>\n                <ion-textarea placeholder="내용을 입력해주세요." [(ngModel)]="article.article_content"></ion-textarea>\n            </ion-item>\n        </div>\n</ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/smEdit/smEdit.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], SmEditPage);

//# sourceMappingURL=smEdit.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Article; });
var Article = (function () {
    function Article(id, board_id, article_title, article_content, article_writer, article_hit, timestamp, user_name) {
        this.id = id;
        this.article_title = article_title;
        this.article_content = article_content;
        this.article_writer = article_writer;
        this.article_hit = article_hit;
        this.timestamp = timestamp;
        this.user_name = user_name;
    }
    return Article;
}());

//# sourceMappingURL=article.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WritePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notice_notice__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_server_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_article__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WritePage = (function () {
    function WritePage(viewCtrl, app, serverService, navCtrl, navParams, toastCtrl) {
        this.viewCtrl = viewCtrl;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.board_id = this.navParams.get("board_id");
        this.serverService = serverService;
        this.article = new __WEBPACK_IMPORTED_MODULE_5__models_article__["a" /* Article */](0, 0, "", "", 0, 0, 0, "");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
    }
    WritePage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    WritePage.prototype.writeSubmit = function () {
        var _this = this;
        this.article.board_id = this.board_id;
        this.article.article_writer = this.USERID;
        this.serverService.creatArticle(this.article);
        this.presentToast('게시글이 등록되었습니다');
        setTimeout(function () {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__notice_notice__["a" /* NoticePage */]);
        }, 300);
        this.dismiss();
        //this.navCtrl.pop();
    };
    WritePage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message.title,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    WritePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return WritePage;
}());
WritePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/write/write.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div class="home_logo_wrapper" (click)="openHomePage()">\n      <img src="assets/img/Logo2.png" class="home-logo"/>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="page-write">\n    <ion-list>\n        <ion-item>\n            <ion-input type="text" placeholder="제목을 입력해주세요." [(ngModel)]="article.article_title"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-textarea placeholder="내용을 입력해주세요." class="write_textarea" [(ngModel)]="article.article_content"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <input type="file" id="upload" name="uploadFile" file-upload multiple/>\n        </ion-item>\n        <button ion-button block (click)="writeSubmit()">등록</button>\n    </ion-list>\n    \n</ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/write/write.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
], WritePage);

//# sourceMappingURL=write.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_component__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_user__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_message__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(app, serverService, http, navCtrl, appCtrl, toastCtrl, alertCtrl, modalCtrl, viewCtrl) {
        this.app = app;
        this.serverService = serverService;
        this.http = http;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */](0, "", 0, "");
        this.message = new __WEBPACK_IMPORTED_MODULE_6__models_message__["a" /* Message */];
        this.login_record = 0;
        this.password = "";
        this.http = http;
        this.serverService = serverService;
        this.user = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */](0, "", 0, "");
        this.navCtrl = navCtrl;
        this.message = new __WEBPACK_IMPORTED_MODULE_6__models_message__["a" /* Message */];
    }
    //로그인
    LoginPage.prototype.signIn = function () {
        var _this = this;
        this.serverService.getLoginrecord(this.user.user_id)
            .then(function (message) {
            _this.login_record = message.login_record;
            if (_this.login_record == 0)
                _this.showPasswordAlert();
            else {
                _this.serverService.makeLogin(_this.user)
                    .then(function (message) {
                    if (message.key == -1)
                        _this.presentLoginToast(message);
                    if (message.key == 2)
                        _this.presentLoginToast(message);
                    if (message.key == 0) {
                        localStorage.setItem('currentUser', JSON.stringify({
                            USERID: message.user_id,
                            USERNAME: message.user_name,
                            USERAUTH: message.user_auth
                        }));
                        _this.presentLoginToast(message);
                        //this.navCtrl.push(HomePage);
                        //this.appCtrl.getRootNav().setRoot(HomePage);
                        //window.location.reload();
                        _this.presentLoginToast(message);
                        _this.appCtrl.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */]);
                        window.location.reload();
                    }
                });
            }
        });
    };
    LoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LoginPage.prototype.presentLoginToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message.title,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    LoginPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.showPasswordAlert = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '비밀번호 변경',
            inputs: [
                {
                    name: 'password',
                    type: 'password',
                    placeholder: '기존 비밀번호',
                },
                {
                    name: 'newPassword',
                    type: 'password',
                    placeholder: '새 비밀번호',
                },
                {
                    name: 'newPasswordCheck',
                    type: 'password',
                    placeholder: '비밀번호 확인',
                }
            ],
            buttons: [
                {
                    text: '취소',
                    handler: function (data) {
                    }
                },
                {
                    text: '확인',
                    handler: function (data) {
                        //비번이 기존꺼랑 일치하는지 여부 틀리면 틀리다.
                        _this.user.user_password = data['newPassword'];
                        _this.serverService.updatePassword(_this.user)
                            .then(function (message) {
                            _this.presentLoginToast(message);
                            localStorage.setItem('currentUser', JSON.stringify({
                                USERID: message.user_id,
                                USERNAME: message.user_name,
                                USERAUTH: message.user_auth
                            }));
                            // this.navCtrl.push(HomePage);
                            // this.appCtrl.getRootNav().setRoot(HomePage);
                            // window.location.reload();
                            _this.presentLoginToast(message);
                            _this.appCtrl.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__app_app_component__["a" /* MyApp */]);
                            window.location.reload();
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/login/login.html"*/'<ion-content class="page-login">\n    <section class="loginSection">\n        <img src="assets/img/Logo1.jpg" class="sm-logo" />\n        <table class="loginTable">\n                <tr>\n                    <td>\n                        <ion-item>\n                                <ion-label floating>ID</ion-label><!--id input-->\n                                <ion-input type="text" [(ngModel)]="user.user_id"></ion-input>\n                        </ion-item>\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <ion-item>\n                            <ion-label floating>Password</ion-label><!--pw input-->\n                            <ion-input type="password" [(ngModel)]="user.user_password"></ion-input>\n                        </ion-item>\n                    </td>\n                </tr>\n        </table>\n        <button ion-button (click)="signIn()" class="login-button">로그인</button>\n\n        <p class="smLoginP" (click)="openSmLoginPage()"><ion-icon end name=\'help-circle\'></ion-icon>&nbsp;&nbsp;SM사업이란?</p>\n    </section>\n</ion-content>\n  '/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_7__app_server_service__["a" /* ServerService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ViewController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reading_reading__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QuestionPage = (function () {
    function QuestionPage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    QuestionPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    QuestionPage.prototype.openReadingPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__reading_reading__["a" /* ReadingPage */]);
    };
    QuestionPage.prototype.showReadyAlert = function () {
        var alert = this.alertCtrl.create({
            title: '준비 중입니다',
            buttons: ['OK'],
        });
        alert.present();
    };
    return QuestionPage;
}());
QuestionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/question/question.html"*/'<ion-header class="header-question">\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <div class="home_logo_wrapper" (click)="openHomePage()">\n        <img src="assets/img/Logo2.png" class="home-logo"/>\n      </div>\n      <ion-buttons end> <!-- 네비게이션 바에 가장 오른쪽에 만들겠다는 뜻 -->\n        <button ion-button icon-only (click)="showReadyAlert()">\n            <ion-icon name=\'search\'></ion-icon>\n        </button>\n    </ion-buttons>\n    </ion-navbar>\n    </ion-header>\n    \n    <ion-content class="page-question">\n            <table class="noticeTable">\n                    <tr>\n                      <td>\n                          Q & A\n                      </td>\n                      <td>\n                          <ion-icon name="md-create"></ion-icon>\n                      </td>\n                    </tr>\n            </table>\n            <table class="noticeTable-in" (click)="openReadingPage()">\n                    <tr>\n                        <td>\n                            기한 내에 보고서를 제출하지 못했는데 어떻게 해야하는지 알려주세요.\n                        </td>\n                        <td rowspan="2" class="question_Answer">답변<br/>완료</td>\n                    </tr>\n                    <tr>\n                        <td>\n                            홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-08-30 14:30&nbsp;&nbsp;|&nbsp;&nbsp;조회수 35\n                        </td>\n                    </tr>\n            </table>\n            <table class="noticeTable-in" (click)="openReadingPage()">\n                    <tr>\n                        <td>\n                            멘토 자격조건이 어떻게 되나요?\n                        </td>\n                        <td rowspan="2" class="question_Answer">&nbsp;</td>\n                    </tr>\n                    <tr>\n                        <td>\n                            홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-08-30 14:30&nbsp;&nbsp;|&nbsp;&nbsp;조회수 35\n                        </td>\n                    </tr>\n            </table>\n            <table class="noticeTable-in" (click)="openReadingPage()">\n                    <tr>\n                        <td>\n                            멘토 장학금은 언제 들어오나요?\n                        </td>\n                        <td rowspan="2" class="question_Answer">답변<br/>완료</td>\n                    </tr>\n                    <tr>\n                        <td>\n                            홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-08-30 14:30&nbsp;&nbsp;|&nbsp;&nbsp;조회수 35\n                        </td>\n                    </tr>\n            </table>\n            <table class="noticeTable-in" (click)="openReadingPage()">\n                    <tr>\n                        <td>\n                            멘티 신청을 취소하고 싶은데 어떻게 해야하나요?\n                        </td>\n                        <td rowspan="2" class="question_Answer">답변<br/>완료</td>\n                    </tr>\n                    <tr>\n                        <td>\n                            홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-08-30 14:30&nbsp;&nbsp;|&nbsp;&nbsp;조회수 35\n                        </td>\n                    </tr>\n            </table>\n            <table class="noticeTable-in" (click)="openReadingPage()">\n                    <tr>\n                        <td>\n                            멘토 신청을 취소하고 싶습니다.\n                        </td>\n                        <td rowspan="2" class="question_Answer">답변<br/>완료</td>\n                    </tr>\n                    <tr>\n                        <td>\n                            홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-08-30 14:30&nbsp;&nbsp;|&nbsp;&nbsp;조회수 35\n                        </td>\n                    </tr>\n            </table>\n           \n    </ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/question/question.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], QuestionPage);

//# sourceMappingURL=question.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mentoroom; });
var Mentoroom = (function () {
    function Mentoroom(team_name, team_about, team_theme, team_filekind, team_link, team_year, team_semester, mento_id) {
        this.team_name = team_name;
        this.team_about = team_about;
        this.team_theme = team_theme;
        this.team_filekind = team_filekind;
        this.team_link = team_link;
        this.team_year = team_year;
        this.team_semester = team_semester;
        this.mento_id = mento_id;
    }
    return Mentoroom;
}());

//# sourceMappingURL=mentoroom.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MentorAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__room_room__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_mentoroom__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { CoolLocalStorage } from 'angular2-cool-storage';
var MentorAddPage = (function () {
    function MentorAddPage(app, appCtrl, viewCtrl, toastCtrl, navCtrl, serverService) {
        this.app = app;
        this.appCtrl = appCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.sort = 0;
        this.sortArray = [];
        this.mentoroom = new __WEBPACK_IMPORTED_MODULE_3__models_mentoroom__["a" /* Mentoroom */]("", "", "", 0, "", 0, 0, 0);
        this.serverService = serverService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
        console.log('유저아이디' + this.USERID);
    }
    MentorAddPage.prototype.ngOnInit = function () {
    };
    MentorAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    //멘토 신청
    MentorAddPage.prototype.openRoomPage = function () {
        var _this = this;
        this.mentoroom.mento_id = this.USERID;
        console.log(this.mentoroom.mento_id);
        this.serverService.createMentoroom(this.mentoroom)
            .then(function (message) {
            _this.presentToast(message);
        });
        //this.navCtrl.setRoot(RoomPage);
        setTimeout(function () {
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__room_room__["a" /* RoomPage */]);
        }, 300);
        this.dismiss();
    };
    MentorAddPage.prototype.fileClick = function (sort) {
        this.sortArray[sort] = !this.sortArray[sort];
    };
    MentorAddPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message.title,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    return MentorAddPage;
}());
MentorAddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/mentorAdd/mentorAdd.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-buttons left>\n        <button ion-button (click)="dismiss()">\n                <span ion-text><ion-icon name="ios-close-circle-outline"></ion-icon></span>  \n        </button>\n        </ion-buttons>\n        <ion-title>멘토신청</ion-title> \n        <ion-buttons end>\n            <button ion-button (click)="openRoomPage()">\n                <span ion-text><ion-icon name="ios-checkmark-circle-outline"></ion-icon></span>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="page-mentorAdd">\n    <ion-list>\n        \n        <!--팀명-->\n        <ion-item>\n                <ion-input type="text" name="팀명" placeholder="팀명" [(ngModel)]="mentoroom.team_name"></ion-input> \n        </ion-item>\n\n        <!--주제-->\n        <ion-item>\n                <ion-input type="text" placeholder="주제" [(ngModel)]="mentoroom.team_theme"></ion-input> \n        </ion-item>\n\n        <!--첨부-->\n        <ion-item class="fileTitle">\n            <ion-icon name="logo-youtube" class="youtube-icon" (click)="fileClick(0)"></ion-icon><p (click)="fileClick(0)">영상링크</p>\n            <ion-icon name="md-photos" class="photos-icon" (click)="fileClick(1)"></ion-icon><p (click)="fileClick(1)">팀광고사진</p>\n            <ion-icon name="ios-link" class="link-icon" (click)="fileClick(2)"></ion-icon><p (click)="fileClick(2)">자격증명파일</p>\n        </ion-item>\n\n        <!--동영상 링크-->\n        <ion-item *ngIf="sortArray[0]==true">\n                <ion-label><ion-icon name="logo-youtube" class="youtube-icon"></ion-icon></ion-label>\n                <ion-input placeholder="영상 링크 주소를 입력해주세요." class="youtube-input" [(ngModel)]="mentoroom.team_link"></ion-input>\n        </ion-item>\n\n        <!--팀 광고사진-->\n        <ion-item *ngIf="sortArray[1]==true">\n                <ion-icon name="md-photos" class="photos-icon"></ion-icon>\n                <input type="file" id="upload" name="uploadFile" file-upload multiple/>\n        </ion-item>\n\n        <!--자격증명파일-->\n        <ion-item *ngIf="sortArray[2]==true">\n                <ion-icon name="ios-link" class="link-icon"></ion-icon>\n                <input type="file" id="upload" name="uploadFile" file-upload multiple/>\n        </ion-item>\n\n        <!--팀 소개 및 설명-->\n        <ion-item>\n                <ion-textarea placeholder="팀 소개 및 설명" [(ngModel)]="mentoroom.team_about"></ion-textarea>\n        </ion-item>\n\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/mentorAdd/mentorAdd.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__app_server_service__["a" /* ServerService */]])
], MentorAddPage);

//# sourceMappingURL=mentorAdd.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_server_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_mentoRoomInfo__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__roomDetail_roomDetail__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messageAdd_messageAdd__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__survey_survey__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_admin_service__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ManagerPage = (function () {
    function ManagerPage(serverService, adminService, modalCtrl, navCtrl, platform, alertCtrl, toastCtrl) {
        this.serverService = serverService;
        this.adminService = adminService;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.manager = "mentorRoom";
        this.isAndroid = false;
        this.count = 1;
        this.mentorooms = [];
        this.users = [];
        this.selectedUser = [];
        this.selectedAll = false; //멘토방목록 전체선택
        this.selectedAll2 = false; //사용자관리 전체선택
        this.selectedAll3 = false; //보고서목록 전체선택
        this.selectDefualtAuth = 1;
        this.selectDefualtYear = 20172;
        this.roomListChecked = [];
        this.isAndroid = platform.is('android');
        this.mentoRoomInfo = new __WEBPACK_IMPORTED_MODULE_4__models_mentoRoomInfo__["a" /* MentoRoomInfo */](1, "", "", "", "", "", "", "", "", "", "");
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
        this.serverService = serverService;
        this.getMentoRoomInfo();
    }
    ManagerPage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getMentoroomListByYear(20172)
            .then(function (mentoroom) { return _this.mentorooms = mentoroom; });
        this.adminService.userList(1)
            .then(function (users) { return _this.users = users; });
    };
    //멘토방 설정시킨 것 불러오기
    ManagerPage.prototype.getMentoRoomInfo = function () {
        var _this = this;
        this.serverService.getMentoRoomInfo()
            .then(function (mentoRoomInfo) { return _this.mentoRoomInfo = mentoRoomInfo; });
    };
    ManagerPage.prototype.handleSelectedUser = function (e, user_id) {
        // checked
        if (e.checked) {
            this.selectedUser.push(user_id);
        }
        else {
            // not checked
            var index = this.selectedUser.indexOf(user_id);
            this.selectedUser.splice(index, 1);
        }
    };
    //멘토방 설정 저장
    ManagerPage.prototype.mentoRoomInfoSave = function () {
        var _this = this;
        this.serverService.createMentoRoomInfo(this.mentoRoomInfo)
            .then(function (message) {
            _this.presentToast();
        });
        console.log(typeof (this.mentoRoomInfo.max_mento));
    };
    //멘토방 설정 완료 알림창
    ManagerPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: '멘토방 설정이 완료되었습니다.',
            duration: 3000,
            position: 'top',
        });
        toast.present();
    };
    //멘토방목록 - 전체선택 클릭 시
    ManagerPage.prototype.roomList_selectedAll = function () {
        this.selectedAll = !this.selectedAll;
        this.selectedAll2 = false;
        this.selectedAll3 = false;
    };
    //사용자관리 - 전체선택 클릭 시
    ManagerPage.prototype.userList_selectedAll = function () {
        this.selectedAll2 = !this.selectedAll2;
        this.selectedAll = false;
        this.selectedAll3 = false;
    };
    //보고서 목록 - 전체선택 클릭 시
    ManagerPage.prototype.reportList_selectedAll = function () {
        this.selectedAll3 = !this.selectedAll3;
        this.selectedAll = false;
        this.selectedAll2 = false;
    };
    ManagerPage.prototype.roomList_selected = function () {
        this.selectedAll = false;
    };
    ManagerPage.prototype.userList_selected = function () {
        this.selectedAll2 = false;
    };
    ManagerPage.prototype.reportList_selected = function () {
        this.selectedAll3 = false;
    };
    ManagerPage.prototype.userList = function (e) {
        var _this = this;
        this.adminService.userList(e)
            .then(function (users) { return _this.users = users; });
    };
    ManagerPage.prototype.getMentoroomListByYear = function (e) {
        var _this = this;
        this.serverService.getMentoroomListByYear(e)
            .then(function (mentoroom) { return _this.mentorooms = mentoroom; });
    };
    ManagerPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    ManagerPage.prototype.openRoomDetail = function (mentoroom) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__roomDetail_roomDetail__["a" /* RoomDetailPage */], {
            mentoroom_id: mentoroom.mentoroom_id,
        });
    };
    ManagerPage.prototype.showManagerAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '관리자 지정',
            subTitle: '관리자로 지정하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: function (data) {
                    }
                },
                {
                    text: '확인',
                    handler: function (data) {
                        for (var _i = 0, _a = _this.selectedUser; _i < _a.length; _i++) {
                            var uid = _a[_i];
                            _this.serverService.updateEmpowerUser(uid);
                        }
                        _this.managerToast();
                    }
                }
            ]
        });
        alert.present();
    };
    ManagerPage.prototype.managerToast = function () {
        var toast = this.toastCtrl.create({
            message: '관리자로 지정되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    ManagerPage.prototype.openMessagePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__messageAdd_messageAdd__["a" /* MessageAddPage */], {
            selectedUser: this.selectedUser
        });
        // let modal = this.modalCtrl.create(MessageAddPage);
        // modal.present(this.selectedUser);
    };
    ManagerPage.prototype.showReportDeleteAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '보고서 삭제',
            subTitle: '선택한 보고서를 삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: function (data) {
                    }
                },
                {
                    text: '확인',
                    handler: function (data) {
                        _this.deleteToast();
                    }
                }
            ]
        });
        alert.present();
    };
    ManagerPage.prototype.deleteToast = function () {
        var toast = this.toastCtrl.create({
            message: '보고서가 삭제되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    ManagerPage.prototype.showReportDownloardAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '보고서 다운로드',
            subTitle: '선택한 보고서를 다운로드 하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: function (data) {
                    }
                },
                {
                    text: '확인',
                    handler: function (data) {
                        _this.downloadToast();
                    }
                }
            ]
        });
        alert.present();
    };
    ManagerPage.prototype.downloadToast = function () {
        var toast = this.toastCtrl.create({
            message: '보고서가 다운로드 되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    ManagerPage.prototype.addSurvey = function () {
        if (this.count <= 4) {
            this.count += 1;
        }
        else {
            this.showAlert('더이상 추가할 수 없습니다.');
        }
    };
    ManagerPage.prototype.minusSurvey = function () {
        if (this.count > 1) {
            this.count -= 1;
        }
        else {
            this.showAlert('더이상 제거할 수 없습니다');
        }
    };
    ManagerPage.prototype.showAlert = function (ms) {
        var alert = this.alertCtrl.create({
            title: ms,
            buttons: ['OK'],
        });
        alert.present();
    };
    ManagerPage.prototype.openSurveyPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__survey_survey__["a" /* SurveyPage */]);
        modal.present();
    };
    return ManagerPage;
}());
ManagerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/manager/manager.html"*/'<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <div class="home_logo_wrapper" (click)="openHomePage()">\n        <img src="assets/img/Logo2.png" class="home-logo"/>\n      </div>\n    </ion-navbar>\n  </ion-header>\n  \n<ion-content class="page-manager">\n    <div>\n      <ion-segment [(ngModel)]="manager">\n        <ion-segment-button value="mentorRoom">\n            멘토방설정\n        </ion-segment-button>\n        <ion-segment-button value="roomList">\n            멘토방목록\n          </ion-segment-button>\n        <ion-segment-button value="users">\n            사용자관리\n        </ion-segment-button>\n        <ion-segment-button value="report">\n            보고서목록\n        </ion-segment-button>\n        <ion-segment-button value="survey">\n            설문조사\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n\n    <!--멘토방 설정-->\n    <div [ngSwitch]="manager">\n      <ion-list *ngSwitchCase="\'mentorRoom\'">\n          <ion-item>\n              <ion-label>멘토신청 시작일</ion-label>\n              <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="mentoRoomInfo.mento_start"></ion-datetime>\n          </ion-item>\n          <ion-item>\n              <ion-label>멘토신청 마감일</ion-label>\n              <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="mentoRoomInfo.mento_end"></ion-datetime>\n          </ion-item>\n          <ion-item>\n              <ion-label>멘티신청 시작일</ion-label>\n              <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="mentoRoomInfo.menti_start"></ion-datetime>\n          </ion-item>\n          <ion-item>\n              <ion-label>멘티신청 마감일</ion-label>\n              <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="mentoRoomInfo.menti_end"></ion-datetime>\n          </ion-item>\n          <ion-item>\n            <ion-label>최대 멘토인원</ion-label>\n            <ion-select [(ngModel)]="mentoRoomInfo.max_mento">\n              <ion-option value="10">10명</ion-option>\n              <ion-option value="15">15명</ion-option>\n              <ion-option value="20">20명</ion-option>\n              <ion-option value="25">25명</ion-option>\n              <ion-option value="30">30명</ion-option>\n              <ion-option value="35">35명</ion-option>\n              <ion-option value="40">40명</ion-option>\n              <ion-option value="45">45명</ion-option>\n              <ion-option value="50">50명</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label>최대 멘티인원</ion-label>\n            <ion-select [(ngModel)]="mentoRoomInfo.max_menti">\n              <ion-option value="3">3명</ion-option>\n              <ion-option value="4">4명</ion-option>\n              <ion-option value="5">5명</ion-option>\n              <ion-option value="6">6명</ion-option>\n              <ion-option value="7">7명</ion-option>\n              <ion-option value="8">8명</ion-option>\n              <ion-option value="9">9명</ion-option>\n              <ion-option value="10">10명</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label>모임기간</ion-label>\n            <ion-select [(ngModel)]="mentoRoomInfo.meeting_period">\n              <ion-option value="7">7일</ion-option>\n              <ion-option value="30">30일</ion-option>\n              <ion-option value="60">60일</ion-option>\n              <ion-option value="120">1학기</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label>모임횟수</ion-label>\n            <ion-select [(ngModel)]="mentoRoomInfo.meeting_number">\n              <ion-option value="1">1회</ion-option>\n              <ion-option value="2">2회</ion-option>\n              <ion-option value="3">3회</ion-option>\n              <ion-option value="4">4회</ion-option>\n              <ion-option value="5">5회</ion-option>\n              <ion-option value="6">6회</ion-option>\n              <ion-option value="7">7회</ion-option>\n              <ion-option value="8">8회</ion-option>\n              <ion-option value="9">9회</ion-option>\n              <ion-option value="10">10회</ion-option>\n            </ion-select>\n          </ion-item>\n\n          <ion-item>\n              <ion-label>설문조사 시작일</ion-label>\n              <ion-datetime displayFormat="YYYY/MM/DD" value="survey_start" [(ngModel)]="mentoRoomInfo.survey_start"></ion-datetime>\n          </ion-item>\n          <ion-item>\n              <ion-label>설문조사 마감일</ion-label>\n              <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="mentoRoomInfo.survey_end"></ion-datetime>\n          </ion-item>\n\n\n          <button ion-button block class="mentorRoomButton" (click)="mentoRoomInfoSave()">저장</button>\n\n      </ion-list>\n\n\n      <!-- 멘토방 목록 -->\n      <ion-list *ngSwitchCase="\'roomList\'">\n          <ion-item>\n              <ion-label>\n                  검색기간\n              </ion-label>\n              <ion-select [(ngModel)]="selectDefualtYear" (ionChange)="getMentoroomListByYear($event)">\n                <ion-option [selected]="true" [value]="20172">2017-2학기</ion-option>\n                <ion-option [value]="20171">2017-1학기</ion-option>\n                <ion-option [value]="20162">2016-2학기</ion-option>\n                <ion-option [value]="0">전체학기</ion-option>\n              </ion-select>\n          </ion-item>\n\n          <ion-item>\n              <ion-label>전체선택</ion-label>\n              <ion-checkbox color="danger" (click)="roomList_selectedAll()"></ion-checkbox>\n          </ion-item>\n\n           <!--멘토방 목록-->\n           <div *ngFor="let m of mentorooms">\n                <!--개설완료-->\n                <ion-item (press)="openRoomDetail(m)" *ngIf= "m.team_confirm == 1">\n                  <ion-label><button ion-button class="fileButton">개설완료</button>&nbsp;&nbsp;{{m.team_name}}&nbsp;&nbsp;<span class="sort">|</span>&nbsp;&nbsp;{{m.team_theme}}&nbsp;&nbsp;<span class="sort">|</span>&nbsp;&nbsp;1명</ion-label>\n                  <ion-checkbox *ngIf="selectedAll==false" color="dark" checked="false" (ionChange)="handleSelectedId($event, m.mentoroom_id)"></ion-checkbox>\n                  <ion-checkbox *ngIf="selectedAll==true" color="dark" checked="true" (ionChange)="handleSelectedId($event, m.mentoroom_id)"></ion-checkbox>\n                  <ion-icon (click)="openRoomDetail(m)" item-end name="ios-arrow-forward"></ion-icon> \n                </ion-item>\n                \n                <!-- 대기중 -->\n                <ion-item (press)="openRoomDetail(m)"  *ngIf= "m.team_confirm == 0">\n                  <ion-label><button ion-button class="fileButton4">대기중</button>&nbsp;&nbsp;{{m.team_name}}&nbsp;&nbsp;<span class="sort">|</span>&nbsp;&nbsp;{{m.team_theme}}&nbsp;&nbsp;<span class="sort">|</span>&nbsp;&nbsp;1명</ion-label>\n                  <ion-checkbox *ngIf="selectedAll==false" color="dark" checked="false" (ionChange)="handleSelectedId($event, m.mentoroom_id)"></ion-checkbox>\n                  <ion-checkbox *ngIf="selectedAll==true" color="dark" checked="true" (ionChange)="handleSelectedId($event, m.mentoroom_id)"></ion-checkbox>  \n                  <ion-icon (click)="openRoomDetail(m)" item-end name="ios-arrow-forward"></ion-icon>\n                </ion-item>\n                \n                <!-- 기간 지나서 폐설됨 -->\n                <ion-item  (press)="openRoomDetail(m)" *ngIf= "m.team_confirm == 2">\n                  <ion-label><button ion-button class="fileButton3">폐설됨</button>&nbsp;&nbsp;{{m.team_name}}&nbsp;&nbsp;<span class="sort">|</span>&nbsp;&nbsp;you{{m.team_theme}}&nbsp;&nbsp;<span class="sort">|</span>&nbsp;&nbsp;1명</ion-label>\n                  <ion-checkbox *ngIf="selectedAll==false" color="dark" checked="false" (ionChange)="handleSelectedId($event, m.mentoroom_id)"></ion-checkbox>\n                  <ion-checkbox *ngIf="selectedAll==true" color="dark" checked="true" (ionChange)="handleSelectedId($event, m.mentoroom_id)"></ion-checkbox>\n                  <ion-icon (click)="openRoomDetail(m)" item-end name="ios-arrow-forward"></ion-icon>\n                </ion-item> \n            </div>\n           \n            <button ion-button block class="mentorRoomButton" (click)="deleteMentoroom()">목록에서 삭제</button>\n\n      </ion-list> \n\n      <!--사용자 관리-->\n      <ion-list *ngSwitchCase="\'users\'">\n          <ion-item>\n              <ion-label> 사용자 목록 </ion-label>\n              <ion-select [(ngModel)]="selectDefualtAuth" (ionChange)="userList($event)">\n                <ion-option [selected]="true" [value]="1">멘토</ion-option>\n                <ion-option [value]="2">멘티</ion-option>\n                <ion-option [value]="3">관리자</ion-option>\n              </ion-select>\n          </ion-item>\n\n          <ion-item>\n              <ion-label>전체선택</ion-label>\n              <ion-checkbox color="danger" (click)="userList_selectedAll()"></ion-checkbox>\n          </ion-item>\n\n          <ion-item *ngFor="let user of users">\n            <ion-label>{{user.user_name}} {{user.user_id}}</ion-label>\n            <ion-checkbox *ngIf="selectedAll2==false" color="dark" checked="false" (ionChange)="handleSelectedUser($event, user.user_id)"></ion-checkbox>\n            <ion-checkbox *ngIf="selectedAll2==true" color="dark" checked="true" (ionChange)="handleSelectedUser($event, user.user_id)"></ion-checkbox>\n          </ion-item> \n          <!-- 멘토 검색-->\n          <!--\n          <table class="userTable">\n              <tr>\n                  <td>\n                    <ion-item no-lines>\n                        <ion-label>201300000 홍길동</ion-label>\n                        <ion-checkbox color="dark" checked="false"></ion-checkbox>\n                    </ion-item> \n                  </td>\n              </tr>\n              <tr>\n                  <td>\n                      보고서 제출 여부 : <span class="yes">Y</span> / 활동비, 장학금 지급 대상자 : <span class="yes">Y</span>\n                  </td>\n              </tr>\n          </table>\n          <table class="userTable">\n                <tr>\n                    <td>\n                      <ion-item no-lines>\n                          <ion-label>201300000 김길동</ion-label>\n                          <ion-checkbox color="dark" checked="false"></ion-checkbox>\n                      </ion-item> \n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        보고서 제출 여부 : <span class="no">N</span> / 활동비, 장학금 지급 대상자 : <span class="no">N</span>\n                    </td>\n                </tr>\n            </table>\n            <table class="userTable">\n                <tr>\n                    <td>\n                      <ion-item no-lines>\n                          <ion-label>201300000 이길동</ion-label>\n                          <ion-checkbox color="dark" checked="false"></ion-checkbox>\n                      </ion-item> \n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        보고서 제출 여부 : <span class="no">N</span> / 활동비, 장학금 지급 대상자 : <span class="no">N</span>\n                    </td>\n                </tr>\n            </table>\n            <table class="userTable">\n                <tr>\n                    <td>\n                      <ion-item no-lines>\n                          <ion-label>201300000 최길동</ion-label>\n                          <ion-checkbox color="dark" checked="false"></ion-checkbox>\n                      </ion-item> \n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        보고서 제출 여부 : <span class="no">N</span> / 활동비, 장학금 지급 대상자 : <span class="no">N</span>\n                    </td>\n                </tr>\n            </table>\n        -->\n          <!--멘티/관리자 검색-->\n          \n\n          <div class="buttonWrapper">\n              <!--\n              <button ion-button block class="editButton" (click)="openWritePage()">수정</button>-->\n              <button ion-button block class="editButton" (click)="openMessagePage()">쪽지보내기</button>\n              \n              <button ion-button block class="deleteButton" (click)="showManagerAlert()" *ngIf="selectDefualtAuth != 3">관리자지정</button>\n              \n              <button ion-button block class="deleteButton" (click)="showManagerAlert()" *ngIf="selectDefualtAuth == 3">관리자삭제</button>\n          </div>\n          \n      </ion-list>\n\n      <!--보고서 목록-->\n      <ion-list *ngSwitchCase="\'report\'">\n          <ion-item>\n              <ion-label>\n                  검색기간\n              </ion-label>\n              <ion-select>\n                <ion-option [selected]="true">2017-2학기</ion-option>\n                <ion-option>2017-1학기</ion-option>\n                <ion-option>전체학기</ion-option>\n              </ion-select>\n          </ion-item>\n\n          <ion-item>\n              <ion-label>전체선택</ion-label>\n              <ion-checkbox color="danger" (click)="reportList_selectedAll()"></ion-checkbox>\n          </ion-item>\n\n          <table class="userTable">\n              <tr>\n                  <td>\n                    <ion-item no-lines>\n                        <ion-label><span class="teamName">[자바를 잡아]</span> 1차보고서</ion-label>\n                        <ion-checkbox *ngIf="selectedAll3==false" color="dark" checked="false"></ion-checkbox>\n                        <ion-checkbox *ngIf="selectedAll3==true" color="dark" checked="true"></ion-checkbox>\n                    </ion-item> \n                  </td>\n              </tr>\n              <tr>\n                  <td>\n                      홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-09-30&nbsp;&nbsp;|&nbsp;&nbsp;확인완료\n                  </td>\n              </tr>\n          </table>  \n          <table class="userTable">\n              <tr>\n                  <td>\n                    <ion-item no-lines>\n                        <ion-label><span class="teamName">[자바를 잡아]</span> 2차보고서</ion-label>\n                        <ion-checkbox *ngIf="selectedAll3==false" color="dark" checked="false"></ion-checkbox>\n                        <ion-checkbox *ngIf="selectedAll3==true" color="dark" checked="true"></ion-checkbox>\n                    </ion-item> \n                  </td>\n              </tr>\n              <tr>\n                  <td>\n                      홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-09-30&nbsp;&nbsp;|&nbsp;&nbsp;확인완료\n                  </td>\n              </tr>\n          </table> \n          <table class="userTable">\n              <tr>\n                  <td>\n                    <ion-item no-lines>\n                        <ion-label><span class="teamName">[썬]</span> 1차보고서</ion-label>\n                        <ion-checkbox *ngIf="selectedAll3==false" color="dark" checked="false"></ion-checkbox>\n                        <ion-checkbox *ngIf="selectedAll3==true" color="dark" checked="true"></ion-checkbox>\n                    </ion-item> \n                  </td>\n              </tr>\n              <tr>\n                  <td>\n                      홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-09-30&nbsp;&nbsp;|&nbsp;&nbsp;확인중\n                  </td>\n              </tr>\n          </table> \n          <table class="userTable">\n              <tr>\n                  <td>\n                    <ion-item no-lines>\n                        <ion-label><span class="teamName">[ALGO]</span> 1차보고서</ion-label>\n                        <ion-checkbox *ngIf="selectedAll3==false" color="dark" checked="false"></ion-checkbox>\n                        <ion-checkbox *ngIf="selectedAll3==true" color="dark" checked="true"></ion-checkbox>\n                    </ion-item> \n                  </td>\n              </tr>\n              <tr>\n                  <td>\n                      홍길동&nbsp;&nbsp;|&nbsp;&nbsp;2017-09-30&nbsp;&nbsp;|&nbsp;&nbsp;반려\n                  </td>\n              </tr>\n          </table> \n\n          <button ion-button block class="editButton" (click)="showReportDeleteAlert()">보고서삭제</button>\n          <button ion-button block class="deleteButton" (click)="showReportDownloardAlert()">다운로드</button>\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'survey\'">\n\n        <div class="addBox">\n            <ion-item>\n                <ion-label>Q1.</ion-label>\n                <ion-input type="text" placeholder="설문 내용을 입력해주세요."></ion-input>\n            </ion-item>\n        </div>\n        <div class="addBox" *ngIf="count>1">\n            <ion-item>\n                <ion-label>Q2.</ion-label>\n                <ion-input type="text" placeholder="설문 내용을 입력해주세요."></ion-input>\n            </ion-item>\n        </div>\n        <div class="addBox" *ngIf="count>2">\n            <ion-item>\n                <ion-label>Q3.</ion-label>\n                <ion-input type="text" placeholder="설문 내용을 입력해주세요."></ion-input>\n            </ion-item>\n        </div>\n        <div class="addBox" *ngIf="count>3">\n            <ion-item>\n                <ion-label>Q4.</ion-label>\n                <ion-input type="text" placeholder="설문 내용을 입력해주세요."></ion-input>\n            </ion-item>\n        </div>\n        <div class="addBox" *ngIf="count>4">\n            <ion-item>\n                <ion-label>Q5.</ion-label>\n                <ion-input type="text" placeholder="설문 내용을 입력해주세요."></ion-input>\n            </ion-item>\n        </div>\n        \n        <ion-item no-lines class="timeaddbutton">\n            <button ion-button outline item-right icon-left (click)="addSurvey()">\n                설문 항목추가\n            </button>\n            <button ion-button outline item-right icon-left class="surveyTrash" (click)="minusSurvey()">\n                항목삭제\n            </button>\n        </ion-item>\n\n\n        <button ion-button block class="mentorRoomButton">저장</button>\n        <button ion-button block class="mentorRoomButton2" (click)="openSurveyPage()">설문조사 결과</button>\n\n      </ion-list>\n\n    </div>\n\n  </ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/manager/manager.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_server_service__["a" /* ServerService */],
        __WEBPACK_IMPORTED_MODULE_8__app_admin_service__["a" /* AdminService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
], ManagerPage);

//# sourceMappingURL=manager.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_message_service__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageAddPage = (function () {
    function MessageAddPage(viewCtrl, toastCtrl, navParams, messageService) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.messageService = messageService;
        this.selectedUser = [];
        this.selectedUsername = [];
        this.message = {
            to_id: '',
            from_id: '',
            title: '',
            content: ''
        };
        this.selectedUser = this.navParams.get('selectedUser');
        this.selectedUser.forEach(function (e) { return _this.getUsername(e); });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    MessageAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MessageAddPage.prototype.messageAdd = function () {
        var toast = this.toastCtrl.create({
            message: '쪽지가 전송되었습니다.',
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    MessageAddPage.prototype.getUsername = function (u_id) {
        var _this = this;
        this.messageService.getUsername(u_id)
            .then(function (username) { return _this.selectedUsername.push(username); });
    };
    MessageAddPage.prototype.createMessage = function () {
        var _this = this;
        this.selectedUser.forEach(function (e) {
            var message = {
                to_id: e,
                from_id: _this.currentUser.USERID,
                message_title: _this.message.title,
                message_content: _this.message.content
            };
            _this.messageService.createMessage(message)
                .then(function (res) { return console.log(res); });
            _this.messageAdd();
        });
    };
    return MessageAddPage;
}());
MessageAddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/messageAdd/messageAdd.html"*/'<ion-header>\n        <ion-toolbar>\n            <ion-title>쪽지보내기</ion-title> \n            <ion-buttons end>\n                <button ion-button (click)="dismiss()">\n                    <span ion-text><ion-icon name="close"></ion-icon></span>\n                </button>\n            </ion-buttons>\n        </ion-toolbar>\n</ion-header>    \n\n<ion-content class="page-messageAdd">\n    <ion-list>\n        <ion-item>\n            수신인 :\n            <span *ngFor="let username of selectedUsername">\n                {{ username.user_name }}\n            </span>\n        </ion-item>\n        <ion-item>\n            <ion-input type="text" [(ngModel)]="message.title" placeholder="제목을 입력해주세요."></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-textarea [(ngModel)]="message.content" placeholder="내용을 입력해주세요." class="write_textarea"></ion-textarea>\n        </ion-item>\n        <button ion-button block (click)="createMessage()" (click)="dismiss()">전송</button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/messageAdd/messageAdd.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_message_service__["a" /* MessageService */]])
], MessageAddPage);

//# sourceMappingURL=messageAdd.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SurveyPage = (function () {
    function SurveyPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    SurveyPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return SurveyPage;
}());
SurveyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/survey/survey.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-title>설문조사 결과</ion-title> \n        <ion-buttons end>\n            <button ion-button (click)="dismiss()">\n                <span ion-text><ion-icon name="close"></ion-icon></span>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="page-survey">\n    <ion-list>\n        <ion-list-header>\n            Q1. 멘토링 활동에 만족하셨나요?           \n        </ion-list-header>\n        <ion-item padding>\n            ① 23%&nbsp;&nbsp;② 20%&nbsp;&nbsp;③ 43%&nbsp;&nbsp;④ 4%&nbsp;&nbsp;⑤ 10%\n        </ion-item> \n        <ion-list-header>\n            Q2. 멘토링 활동에 만족하셨나요?           \n        </ion-list-header>\n        <ion-item padding>\n            ① 23%&nbsp;&nbsp;② 20%&nbsp;&nbsp;③ 43%&nbsp;&nbsp;④ 4%&nbsp;&nbsp;⑤ 10%\n        </ion-item> \n        <ion-list-header>\n            Q3. 멘토링 활동에 만족하셨나요?           \n        </ion-list-header>\n        <ion-item padding>\n            ① 23%&nbsp;&nbsp;② 20%&nbsp;&nbsp;③ 43%&nbsp;&nbsp;④ 4%&nbsp;&nbsp;⑤ 10%\n        </ion-item> \n        <ion-list-header>\n            Q4. 멘토링 활동에 만족하셨나요?           \n        </ion-list-header>\n        <ion-item padding>\n            ① 23%&nbsp;&nbsp;② 20%&nbsp;&nbsp;③ 43%&nbsp;&nbsp;④ 4%&nbsp;&nbsp;⑤ 10%\n        </ion-item> \n        <ion-list-header>\n            Q5. 멘토링 활동에 만족하셨나요?           \n        </ion-list-header>\n        <ion-item padding>\n            ① 23%&nbsp;&nbsp;② 20%&nbsp;&nbsp;③ 43%&nbsp;&nbsp;④ 4%&nbsp;&nbsp;⑤ 10%\n        </ion-item> \n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/survey/survey.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], SurveyPage);

//# sourceMappingURL=survey.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_message_service__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessagePage = (function () {
    function MessagePage(viewCtrl, messageService) {
        this.viewCtrl = viewCtrl;
        this.messageService = messageService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.messageList();
    }
    MessagePage.prototype.messageList = function () {
        var _this = this;
        this.messageService.messageList(this.currentUser.USERID)
            .then(function (messages) { return _this.messages = messages; });
    };
    MessagePage.prototype.handleRemove = function (m_id) {
        this.messageService.removeMessage(m_id)
            .then();
    };
    MessagePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return MessagePage;
}());
MessagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/message/message.html"*/'<ion-header>\n        <ion-toolbar>\n            <ion-title>쪽지함</ion-title> \n            <ion-buttons end>\n                <button ion-button (click)="dismiss()">\n                    <span ion-text><ion-icon name="close"></ion-icon></span>\n                </button>\n            </ion-buttons>\n        </ion-toolbar>\n</ion-header>    \n\n<ion-content class="page-message">\n        <table class="noticeTable-in" *ngFor="let message of messages">\n                <tr>\n                    <td>\n                        <ion-icon name="md-mail"></ion-icon>&nbsp;&nbsp;\n                        {{ message.message_title }}\n                    </td>\n                    <ion-icon name="md-trash" \n                        style="text-align: right;"\n                        (click)="handleRemove(message.id)"\n                    >\n                    </ion-icon>\n                </tr>\n                <tr>\n                    <td>\n                        {{ message.timestamp | date:\'yyyy-MM-dd HH:mm\' }}\n                    </td>\n                </tr>\n        </table>\n        \n</ion-content>\n'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/message/message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__app_message_service__["a" /* MessageService */]])
], MessagePage);

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(233);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__server_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_service__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__message_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_sm_sm__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_notice_notice__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_question_question__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_manager_manager__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_room_room__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_roomDetail_roomDetail__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_mentorAdd_mentorAdd__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_message_message__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_reading_reading__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_write_write__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_messageAdd_messageAdd__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_survey_survey__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_smEdit_smEdit__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//import { EditPage } from '../pages/edit/edit';













//import { CoolStorageModule } from 'angular2-cool-storage';
//import { IonicStorageModule } from '@ionic/storage';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_sm_sm__["a" /* SmPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_notice_notice__["a" /* NoticePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_question_question__["a" /* QuestionPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_room_room__["a" /* RoomPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_manager_manager__["a" /* ManagerPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_roomDetail_roomDetail__["a" /* RoomDetailPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_mentorAdd_mentorAdd__["a" /* MentorAddPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_reading_reading__["a" /* ReadingPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_write_write__["a" /* WritePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_messageAdd_messageAdd__["a" /* MessageAddPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_survey_survey__["a" /* SurveyPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_smEdit_smEdit__["a" /* SmEditPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_sm_sm__["a" /* SmPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_notice_notice__["a" /* NoticePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_question_question__["a" /* QuestionPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_room_room__["a" /* RoomPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_manager_manager__["a" /* ManagerPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_roomDetail_roomDetail__["a" /* RoomDetailPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_mentorAdd_mentorAdd__["a" /* MentorAddPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_reading_reading__["a" /* ReadingPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_write_write__["a" /* WritePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_messageAdd_messageAdd__["a" /* MessageAddPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_survey_survey__["a" /* SurveyPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_smEdit_smEdit__["a" /* SmEditPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__server_service__["a" /* ServerService */],
            __WEBPACK_IMPORTED_MODULE_6__admin_service__["a" /* AdminService */],
            __WEBPACK_IMPORTED_MODULE_7__message_service__["a" /* MessageService */],
            //CoolStorageModule,
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(user_id, user_password, user_auth, user_name) {
        this.user_id = user_id;
        this.user_password = user_password;
        this.user_auth = user_auth;
        this.user_name = user_name;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message() {
    }
    return Message;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MentoRoomInfo; });
var MentoRoomInfo = (function () {
    function MentoRoomInfo(id, mento_start, mento_end, menti_start, menti_end, max_mento, max_menti, meeting_period, meeting_string, survey_start, survey_end) {
        this.id = id;
        this.mento_start = mento_start;
        this.mento_end = mento_end;
        this.menti_start = menti_start;
        this.menti_end = menti_end;
        this.max_mento = max_mento;
        this.max_menti = max_menti;
        this.meeting_period = meeting_period;
        this.meeting_string = meeting_string;
        this.survey_start = survey_start;
        this.survey_end = survey_end;
    }
    return MentoRoomInfo;
}());

//# sourceMappingURL=mentoRoomInfo.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_server_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_article__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { EditPage } from '.././edit/edit';


var ReadingPage = (function () {
    function ReadingPage(viewCtrl, app, toastCtrl, alertCtrl, serverService, navParams, navCtrl, actionSheetCtrl) {
        this.viewCtrl = viewCtrl;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.id = this.navParams.get("id");
        this.board_id = this.navParams.get("board_id");
        this.article = new __WEBPACK_IMPORTED_MODULE_4__models_article__["a" /* Article */](0, 0, "", "", 0, 0, 0, "");
        this.serverService = serverService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
        this.USERAUTH = this.currentUser.USERAUTH;
        //this.comment = new Comment(0,0,"",0);
    }
    ReadingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getArticle(this.board_id, this.id).then(function (article) {
            _this.article = article;
            console.log(article.article_title);
        });
    };
    ReadingPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    ReadingPage.prototype.presentCommentSheet = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: '작업 선택',
            buttons: [{
                    text: '수정',
                    handler: function () {
                    }
                }, {
                    text: '삭제',
                    role: 'destructive',
                    handler: function () {
                    }
                }, {
                    text: '취소',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ReadingPage.prototype.showDeleteAlert = function (article) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '이 글을 삭제하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    handler: function () {
                        console.log('취소 clicked');
                    }
                },
                {
                    text: '삭제하기',
                    handler: function () {
                        _this.serverService.deleteArticle(article.id, article.board_id);
                    }
                }
            ]
        });
        confirm.present();
    };
    /*
      WriteDelete(id) {
    
        this.serverService.removeArticle(id);
        this.Toast('');
        setTimeout(() => {
          this.app.getRootNav().setRoot(RoomPage);
          }, 300);
          this.dismiss();
        this.navCtrl.pop();
      }
      */
    ReadingPage.prototype.Toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    ReadingPage.prototype.openWritePage = function (id) {
        //this.navCtrl.push(EditPage, { id: id });
    };
    /*
      commentSubmit(id) {
        this.comment.article_id = id;
        this.comment.comment_writer = this.USERID;
        this.serverService.createComment(this.comment)
        this.presentToast('댓글이 등록되었습니다');
    
        setTimeout(() => {
          this.app.getRootNav().setRoot(ReadingPage);
          }, 300);
          this.dismiss();
        //this.navCtrl.pop();
      }
      */
    ReadingPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message.title,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    };
    ReadingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ReadingPage;
}());
ReadingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/reading/reading.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div class="home_logo_wrapper" (click)="openHomePage()">\n      <img src="assets/img/Logo2.png" class="home-logo"/>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="page-reading">\n    <table class="reading-top">\n      <tr>\n        <td>\n            {{article.article_title}}\n        </td>\n      </tr>\n      <tr>\n        <td>\n            {{article.user_name}}&nbsp;&nbsp;|&nbsp;&nbsp;{{article.timestamp}}&nbsp;&nbsp;|&nbsp;&nbsp;조회수 {{article.article_hit}}\n        </td>\n      </tr>\n    </table>\n    <hr/>\n    <div id="contentDiv">{{article.article_content}}\n    </div>\n\n    <!--댓글-->\n    <section class="commentTableWrapper">\n        <ion-list (press)="presentCommentSheet()"> \n            <table class="commentListTable">\n                <tr>\n                    <td>\n                      홍길동\n                    </td>\n                    <td>\n                        <span>2017-08-30 14:30</span>\n                    </td>\n                </tr>         \n                <tr>	\n                    <td colspan="2"><div id="commentDiv">기본 기능 소개는 물론 프로그래밍할 때 필요한 사고방식에도 중점을 두고 설명하고 있으며, 설명하는 기능들이 어디서 어떻게 사용되는지도 쉽게 알 수 있도록 실제 사용 환경과 유사한 예제를 다루고 있다.</div></td>		\n                </tr>\n            </table>\n        </ion-list>\n        <ion-list (press)="presentCommentSheet()"> \n            <table class="commentListTable">\n                <tr>\n                    <td>\n                      홍길동\n                    </td>\n                    <td>\n                        <span>2017-08-30 14:30</span>\n                    </td>\n                </tr>         \n                <tr>	\n                    <td colspan="2"><div id="commentDiv">따라서 책을 처음 만났을 때 품었던 학습 의지를 끝까지 유지할 수 있을 것이다.</div></td>		\n                </tr>\n            </table>\n        </ion-list>\n        <ion-list (press)="presentCommentSheet()"> \n            <table class="commentListTable">\n                <tr>\n                    <td>\n                      홍길동\n                    </td>\n                    <td>\n                        <span>2017-08-30 14:30</span>\n                    </td>\n                </tr>         \n                <tr>	\n                    <td colspan="2"><div id="commentDiv">안녕하세요. 댓글 예시입니다.</div></td>		\n                </tr>\n            </table>\n        </ion-list>\n        \n    </section>\n\n    <section class="commentWriteWrapper commentTableWrapper">\n      <table class="comment_textarea_table">\n        <tr>\n          <td>\n              <ion-item no-lines>\n                  <ion-textarea class="comment_textarea" placeholder="댓글을 입력하세요."></ion-textarea>\n              </ion-item>\n          </td>\n          <td>\n              <button ion-button outline><ion-icon name="ios-send"></ion-icon></button>\n          </td>\n        </tr>\n      </table>\n\n  </section>\n  <div class="buttonWrapper">\n    <button ion-button block class="editButton" (click)="openWritePage(article.id)" *ngIf= "article.article_writer == USERID">수정</button>\n    <button ion-button block class="deleteButton" (click)="showDeleteAlert(article)" *ngIf= "article.article_writer == USERID || USERAUTH == 3">삭제</button>\n    <button ion-button block class="editButton" (click)="WriteDelete()" *ngIf= "USERAUTH == 3">답변완료</button>\n    </div>\n\n    <br/>\n    <br/>\n</ion-content>\n'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/reading/reading.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], ReadingPage);

//# sourceMappingURL=reading.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__write_write__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reading_reading__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NoticePage = (function () {
    function NoticePage(serverService, navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.articles = [];
        this.serverService = serverService;
    }
    NoticePage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getList(2).then(function (article) {
            _this.articles = article;
        });
    };
    NoticePage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    NoticePage.prototype.showReadyAlert = function () {
        var alert = this.alertCtrl.create({
            title: '준비 중입니다',
            buttons: ['OK'],
        });
        alert.present();
    };
    NoticePage.prototype.openWritePage = function (board_id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__write_write__["a" /* WritePage */], { board_id: board_id });
    };
    NoticePage.prototype.openReadingPage = function (article) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__reading_reading__["a" /* ReadingPage */], { id: article.id, board_id: article.board_id,
        });
    };
    return NoticePage;
}());
NoticePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/notice/notice.html"*/'<ion-header class="header-notice">\n<ion-navbar>\n  <button ion-button menuToggle>\n    <ion-icon name="menu"></ion-icon>\n  </button>\n  <div class="home_logo_wrapper" (click)="openHomePage()">\n    <img src="assets/img/Logo2.png" class="home-logo"/>\n  </div>\n  <ion-buttons end> <!-- 네비게이션 바에 가장 오른쪽에 만들겠다는 뜻 -->\n    <button ion-button icon-only (click)="showReadyAlert()">\n        <ion-icon name=\'search\'></ion-icon>\n    </button>\n  </ion-buttons>\n</ion-navbar>\n</ion-header>\n\n<ion-content class="page-notice">\n        <table class="noticeTable">\n                <tr>\n                  <td>\n                      NOTICE\n                  </td>\n                  <td (click)="openWritePage(2)">\n                      <ion-icon name="md-create"></ion-icon>\n                  </td>\n                </tr>\n        </table>\n        <table class="noticeTable-in" (click)="openReadingPage(a)" *ngFor="let a of articles">\n                <tr>\n                    <td>\n                        {{a.article_title}}\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        {{a.user_name}}&nbsp;&nbsp;|&nbsp;&nbsp;{{a.timestamp}}&nbsp;&nbsp;|&nbsp;&nbsp;조회수 {{a.article_hit}}\n                    </td>\n                </tr>\n        </table>\n</ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/notice/notice.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], NoticePage);

//# sourceMappingURL=notice.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__roomDetail_roomDetail__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mentorAdd_mentorAdd__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_server_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RoomPage = (function () {
    function RoomPage(serverService, navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.mentorooms = [];
        this.serverService = serverService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERAUTH = this.currentUser.USERAUTH;
    }
    RoomPage.prototype.ngOnInit = function () {
        var _this = this;
        this.serverService.getMentoroomList().then(function (mentoroom) {
            _this.mentorooms = mentoroom;
        });
    };
    RoomPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    RoomPage.prototype.openRoomDetailPage = function (mentoroom) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__roomDetail_roomDetail__["a" /* RoomDetailPage */], {
            mentoroom_id: mentoroom.mentoroom_id,
        });
        //let modal = this.modalCtrl.create(RoomDetailPage);
        // modal.present();
    };
    RoomPage.prototype.openMentorAddPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__mentorAdd_mentorAdd__["a" /* MentorAddPage */]);
        modal.present();
    };
    return RoomPage;
}());
RoomPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jess2/sm345_app/src/pages/room/room.html"*/'<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <div class="home_logo_wrapper" (click)="openHomePage()">\n        <img src="assets/img/Logo2.png" class="home-logo"/>\n      </div>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding class="page-room">\n      \n\n      <table class="roomTable" *ngFor="let m of mentorooms">\n        <tr>\n          <td rowspan="3" class="roomTableImg"><img src="assets/img/book/c.png" /></td>\n          <td>[팀명] {{m.team_name}}&nbsp;&nbsp;\n            <div *ngIf= "m.team_confirm == 0">\n            <button ion-button class="fileButton4">대기중</button>\n            </div>\n            <div *ngIf= "m.team_confirm == 1">\n            <button ion-button class="fileButton">개설완료</button>\n            </div>\n          </td>\n          <td rowspan="3" class="roomTableButton" (click)="openRoomDetailPage(m)"><ion-icon name="ios-arrow-dropright-outline"></ion-icon></td>\n        </tr>\n        <tr>\n          <td>[주제] {{m.team_theme}}</td>\n        </tr>\n        <tr>\n          <td>[현재팀원] 1명</td>\n        </tr>\n      </table>\n<!--\n      <table class="roomTable">\n        <tr>\n          <td rowspan="3" class="roomTableImg"><img src="assets/img/book/java.png" /></td>\n          <td>[팀명] 자바를 잡아&nbsp;&nbsp;<button ion-button class="fileButton">개설완료</button></td>\n          <td rowspan="3" class="roomTableButton" (click)="openRoomDetailPage()"><ion-icon name="ios-arrow-dropright-outline"></ion-icon></td>\n        </tr>\n        <tr>\n          <td>[주제] JAVA</td>\n        </tr>\n        <tr>\n          <td>[현재팀원] 3명</td>\n        </tr>\n      </table>\n\n      <table class="roomTable">\n        <tr>\n          <td rowspan="3" class="roomTableImg"><img src="assets/img/book/algo.png" /></td>\n          <td>[팀명] ALGO&nbsp;&nbsp;<button ion-button class="fileButton">개설완료</button></td>\n          <td rowspan="3" class="roomTableButton" (click)="openRoomDetailPage()"><ion-icon name="ios-arrow-dropright-outline"></ion-icon></td>\n        </tr>\n        <tr>\n          <td>[주제] 알고리즘</td>\n        </tr>\n        <tr>\n          <td>[현재팀원] 2명</td>\n        </tr>\n      </table>\n\n      <table class="roomTable">\n        <tr>\n          <td rowspan="3" class="roomTableImg"><img src="assets/img/book/python.png" /></td>\n          <td>[팀명] 썬&nbsp;&nbsp;<button ion-button class="fileButton">개설완료</button></td>\n          <td rowspan="3" class="roomTableButton" (click)="openRoomDetailPage()"><ion-icon name="ios-arrow-dropright-outline"></ion-icon></td>\n        </tr>\n        <tr>\n          <td>[주제] Python</td>\n        </tr>\n        <tr>\n          <td>[현재팀원] 1명</td>\n        </tr>\n      </table>\n    -->\n    <div *ngIf="currentUser.USERAUTH != 3">\n      <button ion-button block (click)="openMentorAddPage()">멘토신청</button>\n    </div>\n\n  </ion-content>'/*ion-inline-end:"/Users/jess2/sm345_app/src/pages/room/room.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__app_server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], RoomPage);

//# sourceMappingURL=room.js.map

/***/ })

},[214]);
//# sourceMappingURL=main.js.map