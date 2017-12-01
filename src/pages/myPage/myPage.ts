import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { 
  NavController, 
  ModalController, 
  AlertController, 
  ToastController, 
  ViewController,
  LoadingController,
  App 
} from 'ionic-angular';

import { HomePage } from '.././home/home';
import { MyApp } from '../../app/app.component';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { MessagePage } from '.././message/message';

@Component({
  templateUrl: 'myPage.html'
})
export class MyPage implements OnInit {
  public user: User;
  private login_record: number = 0;
  public currentUser;
  USERID: number;

  constructor(
    public app: App, 
    private loginService: LoginService, 
    private http: Http, 
    public navCtrl: NavController, 
    public appCtrl: App, 
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

  //로그인
  signIn(){
    if (typeof this.user.user_id !== 'number' && isNaN(Number(this.user.user_id)) !== false) {
      this.UserIdToast('유저아이디를 숫자로 입력해 주세요.')
    } else {
      this.loading()
      this.loginService.getLoginrecord(this.user)
      .then(message =>
      {
        if(message.key == -1)
          this.presentLoginToast(message);
        else if(message.key == -2)
          this.presentLoginToast(message);
        else if(message.key == -3)
          this.presentLoginToast(message);
        else if(message.key == -4)
          this.presentLoginToast(message);
        else {
          this.login_record = message.login_record;
          
          if(this.login_record == 0) this.showPasswordAlert();
          else {
            this.loginService.makeLogin(this.user)
            .then(message =>
            {  
              if(message.key == -1) this.presentLoginToast(message);
              if(message.key == 2) this.presentLoginToast(message);
              if(message.key == 0) {
        
                localStorage.setItem('currentUser', JSON.stringify({ 
                  USERID: message.user_id,
                  USERNAME: message.user_name,
                  USERAUTH: message.user_auth}));
  
                  this.presentLoginToast(message);
                  this.appCtrl.getRootNav().setRoot(MyApp);
                  window.location.reload();
                }
            });
          }
        }
      }) 
    }
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
                this.UserIdToast('비밀번호가 변경되었습니다.');
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

presentLogoutToast(position: string) {
    let toast = this.toastCtrl.create({
      message: '로그아웃 되었습니다.',
      duration: 3000,
      position: position,
    });
    toast.present();
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
}