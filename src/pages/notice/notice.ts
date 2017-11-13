import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WritePage } from '../write/write';
import { ReadingPage } from '../reading/reading';
import { ServerService } from '../../app/server.service';
import { Article } from '../../models/article';

@Component({
  templateUrl: 'notice.html'
})
export class NoticePage implements OnInit  {
  serverService: ServerService;
  private articles: Article[] =[];

  constructor(serverService: ServerService, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.serverService = serverService;
  }

  ngOnInit() {
    this.serverService.getList(2).then(
      article => { this.articles = article;
    });
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  showReadyAlert() {
    let alert = this.alertCtrl.create({
        title: '준비 중입니다',
        buttons: ['OK'],
    });
    alert.present();
  }

  openWritePage(board_id) {
    this.navCtrl.push(WritePage, {board_id: board_id});
  }

  openReadingPage(article) {
    this.navCtrl.push(ReadingPage, {id: article.id, board_id: article.board_id,
    });
  }
}
