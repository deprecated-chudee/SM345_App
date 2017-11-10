import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController, App } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmLoginPage } from '../smLogin/smLogin';
import { ServerService } from '../../app/server.service';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';
import { User } from '../../models/user';
import { Message } from '../../models/message';
//import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  private user: User;
  private http: Http;
  serverService: ServerService;
  private message: Message;
  //localStorage: CoolLocalStorage;

  constructor(public app: App, serverService: ServerService, http: Http, public navCtrl: NavController, public appCtrl: App, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, /*localStorage: CoolLocalStorage*/) {
    this.http = http;
    this.serverService = serverService;          
    this.user = new User("","",0,"");
    this.navCtrl = navCtrl;
    this.message = new Message;
    //this.localStorage = localStorage;   
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
        
         
          //this.localStorage.setItem('USERID', message.user_id.toString());
          //this.localStorage.setItem('USERAUTH', message.user_auth.toString());
          //this.localStorage.setItem('USERNAME', message.user_name);
         
          ServerService.USERID = message.user_id;
          ServerService.USERNAME = message.user_name;
          ServerService.USERAUTH = message.user_auth;

          this.presentLoginToast(message);
          
          this.appCtrl.getRootNav().setRoot(MyApp);
          window.location.reload();
         
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

                //this.localStorage.setItem('USERID', message.user_id.toString());
               // this.localStorage.setItem('USERAUTH', message.user_auth.toString());
                //this.localStorage.setItem('USERNAME', message.user_name);

                ServerService.USERID = message.user_id;
                ServerService.USERNAME = message.user_name;
                ServerService.USERAUTH = message.user_auth;
              
                this.appCtrl.getRootNav().setRoot(MyApp);
                window.location.reload();
               
            });
            }                   
          }
       ]
    });
    prompt.present();
    }
  }


