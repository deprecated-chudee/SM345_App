import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { WritePage } from '.././write/write';
//import { EditPage } from '.././edit/edit';
import { ServerService } from '../../app/server.service';
import { Article } from '../../models/article';

@Component({
  templateUrl: 'reading.html'
})
export class ReadingPage implements OnInit {
  private id;
  private board_id;
  serverService: ServerService;
  private article: Article;
  private currentUser;
  private USERID;
  private USERAUTH;

  constructor(serverService: ServerService, public navParams: NavParams, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    this.id = this.navParams.get("id");
    this.board_id = this.navParams.get("board_id");
    this.article = new Article(0,0,"","",0,0,0,"");
    this.serverService = serverService;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  ngOnInit() {
    this.serverService.getArticle(this.board_id, this.id).then(
      article => { this.article = article;
                  console.log(article.article_title);
      });
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  presentCommentSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '작업 선택',
      buttons: [{
            text: '수정',
            handler: () => {
            }
        },{
          text: '삭제',
          role: 'destructive',
          handler: () => {
          }
        },{
          text: '취소',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  WriteDelete() {
    this.navCtrl.pop();
  }

  openWritePage(id) {
    //this.navCtrl.push(EditPage, { id: id });
  }
}
