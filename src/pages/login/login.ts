import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController, App } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmLoginPage } from '../smLogin/smLogin';
import { ServerService } from '../../app/server.service';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';
import { User } from '../../models/user';
import { Message } from '../../models/message';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  private user: User;
  private http: Http;
  serverService: ServerService;
  private message: Message;

  constructor(serverService: ServerService, http: Http, public navCtrl: NavController, public appCtrl: App, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.http = http;
    this.serverService = serverService;          
    this.user = new User("","",0,"");
    this.navCtrl = navCtrl;
    this.message = new Message;
  }

  //로그인 버튼 눌렀을 때
  signIn(){
    if(this.user.user_password == '0000')
      this.showPasswordAlert();
    else{
    this.serverService.makeLogin(this.user)
    .then(message =>
      { 
        if(message.key == -1)
          this.presentLoginToast(message);
        if(message.key == 2)
          this.presentLoginToast(message);
        if(message.key == 0){
        
          ServerService.USERID = message.user_id;
          ServerService.USERAUTH = message.user_auth;
          ServerService.USERNAME = message.user_name;
      
          console.log('아이디', ServerService.USERID);
          console.log('권한', ServerService.USERAUTH);
          console.log('이름', ServerService.USERNAME);
          this.presentLoginToast(message.title);
          setTimeout(() => { 
            this.openHomePage();
            }, 300);
        }
      });
    }
    }

  presentLoginToast(message) {
      let toast = this.toastCtrl.create({
      message: message.title,
      duration: 3000,
      position: 'bottom',
      });
      toast.present();
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openSmLoginPage() {
    let modal = this.modalCtrl.create(SmLoginPage);
    modal.present();
  }

  showPasswordAlert() {
    let prompt = this.alertCtrl.create({
       title: '비밀번호 변경',
       inputs: [
            {
              name: 'password',
              type: 'password',
              value: '0000', 
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
              this.serverService.updatePassword(this.user)
              .then(message =>
              {
                this.presentLoginToast(message);

                ServerService.USERID = message.user_id;
                ServerService.USERAUTH = message.user_auth;
                ServerService.USERNAME = message.user_name;
            
                console.log('아이디', ServerService.USERID);
                console.log('권한', ServerService.USERAUTH);
                console.log('이름', ServerService.USERNAME);
              
                setTimeout(() => { 
                this.openHomePage();
                }, 300); 
            });
            }                   
          }
       ]
    });
    prompt.present();
    }
  }


