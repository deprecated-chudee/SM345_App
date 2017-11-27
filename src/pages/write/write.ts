import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, App, ViewController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { QuestionPage } from '.././question/question';
import { NoticePage } from '.././notice/notice';

import { ArticleService } from '../../services/article.service';

import { Article } from '../../models/article';


@Component({
  templateUrl: 'write.html'
})
export class WritePage {
  private article: Article;
  private board_id;
  private currentUser;
  private USERID;

  constructor(
    private articleService: ArticleService, 
    public viewCtrl: ViewController, 
    public app: App, 
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public toastCtrl: ToastController
  ) {
    this.board_id = this.navParams.get("board_id");
    this.article = new Article(0,0,"","",0,0,0,"",0);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  writeSubmit() {
      this.article.board_id = this.board_id;
      this.article.article_writer = this.USERID;
      this.articleService.creatArticle(this.article);
      this.presentToast('게시글이 등록되었습니다');

      if(this.board_id == 2){
        setTimeout(() => { 
          this.app.getRootNav().setRoot(NoticePage);
          }, 300);
          this.dismiss();
          //this.navCtrl.pop();
      }
      if(this.board_id == 3){
        setTimeout(() => { 
          this.app.getRootNav().setRoot(QuestionPage);
          }, 300);
          this.dismiss();
      }
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message.title,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
