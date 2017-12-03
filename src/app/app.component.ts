import { Component, ViewChild, OnInit } from '@angular/core';
import { 
    Nav, 
    Platform, 
    ModalController, 
    AlertController, 
    ToastController,
    LoadingController,
    App
} from 'ionic-angular';
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
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { MyPage } from '../pages/myPage/myPage';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {
    // @ViewChild(Nav) nav: Nav;
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    
    public currentUser;
    public user: User;
    pages: Array<{title: string, component: any}>;
    USERID: number;

    constructor(
        public app: App, 
        public toastCtrl: ToastController, 
        public alertCtrl: AlertController, 
        public modalCtrl: ModalController, 
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen,
        public loadingCtrl: LoadingController,
        private loginService: LoginService,
        public appCtrl: App
    ) {
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
            if(this.currentUser !== null) {
                this.rootPage = HomePage;
<<<<<<< HEAD
            }
            if(this.currentUser === null || this.currentUser === undefined) {
=======
            } 
            if(this.currentUser === undefined || this.currentUser === null) {
>>>>>>> c484d244e9ce5de3eb36dcf9a2d44fe346955f07
                this.rootPage = LoginPage;
            }
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
                    handler: data => { }
                },
                {
                    text: '로그아웃',
                    handler: data => {
                        this.presentLogoutToast('bottom');
                        localStorage.removeItem('currentUser');
                        window.location.reload();
                        this.loading();
                    }
                }
            ]
        });
        prompt.present();
    }

    loginOpen() {
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
    }
  
    presentLogoutToast(position: string) {
        let toast = this.toastCtrl.create({
          message: '로그아웃 되었습니다.',
          duration: 3000,
          position: position,
        });
        toast.present();
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
                  this.user.user_password = data['newPassword'];
                  this.loginService.updatePassword(this.user)
                    .then(user =>
                    {
                      this.presentLoginToast(user.title);
                    });
                }
              }
           ]  
        });
        prompt.present();
      }

      presentLoginToast(user) {
        let toast = this.toastCtrl.create({
          message: user.title,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
      }

    ngOnInit() {
        this.user = new User();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    loading() {
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
          });
        
          loading.present();
        
          setTimeout(() => {
            loading.dismiss();
          }, 3000);
    }

    openMyPage() {
        this.nav.setRoot(MyPage);
    }
}

