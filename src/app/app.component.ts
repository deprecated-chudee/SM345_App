import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SmPage } from '../pages/sm/sm';
import { NoticePage } from '../pages/notice/notice';
import { QuestionPage } from '../pages/question/question';
import { RoomPage } from '../pages/room/room';
import { ManagerPage } from '../pages/manager/manager';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

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
}
