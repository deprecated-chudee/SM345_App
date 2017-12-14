import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SmPage } from '../sm/sm';
import { ReadingPage } from '../reading/reading';
import { NoticePage } from '../notice/notice';

import { ArticleService } from '../../services/article.service';
import { MentoroomService } from '../../services/mentoroom.service';
import { AdminService } from '../../services/admin.service';

import { Article } from '../../models/article';
import { Mentoroom } from '../../models/mentoroom';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private articles: Article[] =[];
  private mentorooms: Mentoroom[];
  private currentUser;
  private setting;
  private reportDateList;

  constructor(
    public navCtrl: NavController,
    private articleService: ArticleService,
    private mentoroomService: MentoroomService,
    private adminService: AdminService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!this.currentUser) this.navCtrl.setRoot(LoginPage)
  }

  ngOnInit() {
    if(this.currentUser){
      this.articleService.getArticleList(2)
        .then(article => this.articles = article);
      this.mentoroomService.getMentoroomList()
        .then(mentorooms => this.mentorooms = mentorooms);
    }
    this.getMentoRoomInfo()
    this.getReportList()
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

  getMentoRoomInfo() {
    this.adminService.getMentoRoomInfo()
        .then(res => this.setting = res)
  }

  getReportList() {
    this.adminService.getReportList()
      .then(reportDateList => this.reportDateList = reportDateList);
  }
}
