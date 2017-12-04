import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyPage } from '../pages/myPage/myPage';
import { HomePage } from '../pages/home/home';
import { SmPage } from '../pages/sm/sm';
import { NoticePage } from '../pages/notice/notice';
import { RoomPage } from '../pages/room/room';
import { QuestionPage } from '../pages/question/question';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = HomePage;
    pages: Array<{title: string, component: any }>;
    
    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen
    ) {
        this.initializeApp();
        this.pages = [
          { title: 'HOME', component: HomePage },
          { title: 'SM사업소개', component: SmPage },
          { title: '공지사항', component: NoticePage },
          { title: '멘토방', component: RoomPage },
          { title: 'Q&A', component: QuestionPage },
          { title: '마이페이지', component: MyPage }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    openMyPage() {
        this.nav.setRoot(MyPage);
    }
}

