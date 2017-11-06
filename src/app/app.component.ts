import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SmPage } from '../pages/sm/sm';
import { NoticePage } from '../pages/notice/notice';
import { QuestionPage } from '../pages/question/question';
import { RoomPage } from '../pages/room/room';
import { ManagerPage } from '../pages/manager/manager';
import { MessagePage } from '../pages/message/message';
import { ServerService } from '../app/server.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  USERID: number;
  USERNAME: string;
  USERAUTH: number;
  serverService: ServerService;

  pages: Array<{title: string, component: any}>;

  constructor(public alertCtrl: AlertController, serverService: ServerService, public modalCtrl: ModalController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.serverService = serverService;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'HOME', component: HomePage }, //0
      { title: 'SM사업소개', component: SmPage }, //1
      { title: '공지사항', component: NoticePage }, //2
      { title: '멘토방', component: RoomPage }, //3
      { title: 'Q&A', component: QuestionPage }, //4
      { title: '관리페이지', component: ManagerPage }, //5
    ];

  }

  ngOnInit() {
    this.USERID = ServerService.USERID;
    this.USERNAME = ServerService.USERNAME;
    this.USERAUTH = ServerService.USERAUTH;
    
    console.log("온잇이름"+this.USERNAME);
    console.log("온잇아이디"+this.USERID);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openMessage() {
    let modal = this.modalCtrl.create(MessagePage);
    modal.present();
  }

  openLogout() {
    let prompt = this.alertCtrl.create({
      title: '로그아웃 하시겠습니까?',
      buttons: [
         {
            text: '취소',
            handler: data => {
            }
         },
         {
            text: '로그아웃',
            handler: data => {
                window.location.reload();
            }
         }
      ]
   });
   prompt.present();
   }
  


  showPasswordAlert() {
    let prompt = this.alertCtrl.create({
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
            handler: data => {
            }
         },
         {
            text: '확인',
            handler: data => {
            }
           
         }
      ]
   });
   prompt.present();
   }
  }

