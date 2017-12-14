import { Component } from '@angular/core';
import { 
  NavController, 
  AlertController, 
  ToastController, 
  ViewController,
  LoadingController
} from 'ionic-angular';

import { HomePage } from '../home/home';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  public user: User;
  private login_record: number = 0;
  public currentUser;
  USERID: number;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private loginService: LoginService, 
  ) { 
    this.user = new User();
  }

  //로그인
  signIn(){
    if (typeof this.user.user_id !== 'number' && isNaN(Number(this.user.user_id)) !== false) {
      this.UserIdToast('유저아이디를 숫자로 입력해 주세요.')
      return false;
    }

    this.loading()
    this.loginService.getLoginrecord(this.user)
      .then(message => {
        if(message.key == -1) { this.presentLoginToast(message); return false; }
        if(message.key == -2) { this.presentLoginToast(message); return false; }
        if(message.key == -3) { this.presentLoginToast(message); return false; }
        if(message.key == -4) { this.presentLoginToast(message); return false; }

        this.login_record = message.login_record;
        
        if(this.login_record == 0) { this.showPasswordAlert(); return false; }
        
        this.loginService.makeLogin(this.user)
          .then(message => {  
            if(message.key === -1) { this.presentLoginToast(message); return false; }
            if(message.key === 2) { this.presentLoginToast(message); return false; }
            if(message.key === 0) {

              localStorage.setItem('currentUser', JSON.stringify({ 
                USERID: message.user_id,
                USERNAME: message.user_name,
                USERAUTH: message.user_auth}));

                this.presentLoginToast(message);
                this.navCtrl.setRoot(HomePage);
              }
          });
      }) 
    
  }  

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentLoginToast(message) {
    let toast = this.toastCtrl.create({
      message: message.title,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  UserIdToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
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
                .then(message => {
                  this.presentLoginToast(message);

                  localStorage.setItem('currentUser', JSON.stringify({ 
                    USERID: message.user_id,
                    USERNAME: message.user_name,
                    USERAUTH: message.user_auth
                  }));
                  this.presentLoginToast(message);
                  this.navCtrl.setRoot(HomePage);
                });
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
}