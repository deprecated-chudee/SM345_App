import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmEditPage } from '.././smEdit/smEdit';
import { ServerService } from '../../app/server.service';
import { Article } from '../../models/article';

@Component({
  templateUrl: 'sm.html'
})
export class SmPage implements OnInit  {
  serverService: ServerService;
  private articles: Article[] =[];
  private currentUser;
  private USERAUTH;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, serverService: ServerService) {
    this.serverService = serverService;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  ngOnInit() {
    this.serverService.getList(1).then(
      article => { this.articles = article;
    });
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  OpenSmEditPage(board_id) {
    this.navCtrl.push(SmEditPage, {board_id: board_id});
  }

  //삭제하시겠습니까? 알림
  showEditDelete() {
      let confirm = this.alertCtrl.create({
        title: '삭제하시겠습니까?',
        buttons: [
          {
            text: '취소',
            handler: () => {
              
            }
          },
          {
            text: '삭제하기',
            handler: () => {
              console.log('삭제');
            }
          }
        ]
      });
      confirm.present();
    
  }
}
