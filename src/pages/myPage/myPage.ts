import { Component, OnInit } from '@angular/core';
import { 
  NavController, 
  ModalController, 
  AlertController, 
  ToastController, 
  ViewController,
  LoadingController
} from 'ionic-angular';

import { HomePage } from '../home/home';
import { MessagePage } from '../message/message';
import { ManagerPage } from '../manager/manager';
 
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'myPage.html'
})
export class MyPage implements OnInit {
  public user: User;
  public currentUser;
  USERID: number;

  constructor(
    private loginService: LoginService, 
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
  }

  ngOnInit() {
    this.user = new User();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
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
                this.user.user_id = this.USERID;
                this.user.user_password = data['newPassword'];
                this.loginService.updatePassword(this.user)
                .then(() => {
                    this.Toast('비밀번호가 변경되었습니다.');
                    // this.Toast(user.title);
                  })
                  .catch(() => {
                    this.Toast('비밀번호 변경 실패.');
                  })
              }
          }
       ]  
    });
    prompt.present();
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
                    this.Toast('로그아웃 되었습니다.');
                    localStorage.removeItem('currentUser');
                    this.navCtrl.setRoot(LoginPage);
                    this.loading();
                }
            }
        ]
      });
      prompt.present();
    }

  loading() {
    let loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
    
      loading.present();
    
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
  }

  openMessage() {
    let modal = this.modalCtrl.create(MessagePage);
    modal.present();
  }

  openManagerPage() {
    this.navCtrl.setRoot(ManagerPage)
  }
}