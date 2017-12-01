import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavParams, ToastController, ViewController, App, NavController, ModalController, AlertController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmEditPage } from '.././smEdit/smEdit';

import { ArticleService } from '../../services/article.service';

import { Article } from '../../models/article';

@Component({
  templateUrl: 'sm.html'
})
export class SmPage implements OnInit  {
  private article: Article;
  private article_id: number;
  private board_id;
  private USERID;
  private articles: Article[] =[];
  private currentUser;
  private USERAUTH;
  private article_title: string;
  private article_content: string;

  toggleSmEdit: boolean = false;

  constructor(
    private articleService: ArticleService,
    public toastCtrl: ToastController, 
    public viewCtrl: ViewController, 
    public app: App, 
    public alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERAUTH = this.currentUser.USERAUTH;
    this.board_id = this.navParams.get("board_id");
    this.article_id = this.navParams.get("id");
    this.article = this.navParams.get("article");
    this.article = new Article(0, '', '', '');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.article_title = this.article.article_title;
    this.article_content = this.article.article_content;
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

  // 수정 토글
  handleToggleSmEdit(article) {
    this.toggleSmEdit = !this.toggleSmEdit;
    console.log(article.id +'수정토글1')
    this.articleService.getArticle(article.id, this.USERID)
    .then(article => {
      this.article = article
      console.log(article)
    })
  }

  // 게시글 정보 가져오기
  getArticle() {
    this.articleService.getArticle(this.article_id, this.USERID)
      .then(article => this.article = article)
  }

  // 수정 완료
  editArticle(article) {
    this.articleService.editArticle(this.article)
      .then(() => console.log(this.article_id))
    this.Toast('수정되었습니다.');
    setTimeout(() => { 
      this.app.getRootNav().setRoot(SmPage);
      }, 300);
  }

  // more 버튼 - 수정 및 삭제
  presentSmSheet(article) {
        let actionSheet = this.actionSheetCtrl.create({
          title: '작업 선택',
          buttons: [
            {
                text: '수정',
                handler: () => {

                  console.log(article.id +'more버튼')
                  this.handleToggleSmEdit(article);
                }
            },{
              text: '삭제',
              role: 'destructive',
              handler: () => {
                this.showEditDelete(article);
              }
            }
          ]
        });
        actionSheet.present();
  }

  openSmPage() {
    this.app.getRootNav().setRoot(SmPage);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
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