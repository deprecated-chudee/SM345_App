import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmLoginPage } from '../smLogin/smLogin';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController) {

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
              setTimeout(() => { 
                this.openHomePage();
              }, 300);}                    
            
          }
       ]
    });
    prompt.present();
    }
  }


