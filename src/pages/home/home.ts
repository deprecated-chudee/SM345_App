import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SmPage } from '../sm/sm';
import { ReadingPage } from '../reading/reading';
import { NoticePage } from '../notice/notice';
import { ServerService } from '../../app/server.service';
import { Article } from '../../models/article';
import { MentorAddPage } from '.././mentorAdd/mentorAdd';
import { MentoroomService } from '../../app/mentoroom.service';
import { Mentoroom } from '../../models/mentoroom';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  serverService: ServerService;
  private articles: Article[] =[];
  private mentorooms: Mentoroom[];

  constructor(
    public navCtrl: NavController,
    serverService: ServerService,
    private mentoroomService: MentoroomService,
  ) {
    this.serverService = serverService;
  }

  ngOnInit() {
    this.serverService.getList(2).then(
      article => { this.articles = article;
    });
    this.mentoroomService.getMentoroomList()
    .then(mentorooms => this.mentorooms = mentorooms);
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
