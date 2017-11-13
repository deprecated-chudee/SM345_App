import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SmPage } from '../sm/sm';
import { ReadingPage } from '../reading/reading';
import { NoticePage } from '../notice/notice';
import { ServerService } from '../../app/server.service';
import { Article } from '../../models/article';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  serverService: ServerService;
  private articles: Article[] =[];

  constructor(public navCtrl: NavController, serverService: ServerService) {
    this.serverService = serverService;
  }

  ngOnInit() {
    this.serverService.getList(2).then(
      article => { this.articles = article;
    });
  }

  openReadingPage(article){
    this.navCtrl.push(ReadingPage, {id: article.id, board_id: article.board_id,
    });
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openSmPage() {
    this.navCtrl.setRoot(SmPage);
  }

  openNoticePage() {
    this.navCtrl.setRoot(NoticePage);
  }


}
