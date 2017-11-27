import { Component, OnInit } from '@angular/core';
import { ToastController, ViewController, App, NavController, ModalController, AlertController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmEditPage } from '.././smEdit/smEdit';

import { ArticleService } from '../../services/article.service';

import { Article } from '../../models/article';

@Component({
  templateUrl: 'sm.html'
})
export class SmPage implements OnInit  {
  private articles: Article[] =[];
  private currentUser;
  private USERAUTH;

  constructor(
    private articleService: ArticleService,
    public toastCtrl: ToastController, 
    public viewCtrl: ViewController, 
    public app: App, 
    public alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  ngOnInit() {
    this.articleService.getArticleList(1)
      .then(article => this.articles = article);
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  OpenSmEditPage(board_id) {
    this.navCtrl.push(SmEditPage, {board_id: board_id});
  }

  //삭제하시겠습니까? 알림
  showEditDelete(article) {
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
              this.articleService.deleteArticle(article.id);
              this.presentToast('삭제되었습니다.');
                setTimeout(() => { 
                  this.navCtrl.setRoot(SmPage);
                  }, 300);
            }
          }
        ]
      });
      confirm.present();
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
    message: message.title,
    duration: 3000,
    position: 'bottom',
    });
    toast.present();
  }


}