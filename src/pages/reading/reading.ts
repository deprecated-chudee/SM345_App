import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, NavParams, AlertController, ToastController,App, ViewController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { WritePage } from '.././write/write';
import { NoticePage } from '.././notice/notice'
import { QuestionPage } from '.././question/question'

import { ArticleService } from '../../services/article.service';
import { CommentService } from '../../services/comment.service';
import { AdminService } from '../../services/admin.service';

import { Article } from '../../models/article';
import { Comment } from '../../models/comment';
@Component({
  templateUrl: 'reading.html'
})
export class ReadingPage implements OnInit {
  private article_id: number;
  private board_id;
  private article: Article;
  private currentUser;
  private USERID;
  private USERAUTH;
  private comments: Comment[] = [];
  private createContent: string = '';

  toggleEdit: boolean = false;

  constructor(
    private articleService: ArticleService, 
    private commentService: CommentService,
    private adminService: AdminService,
    public viewCtrl: ViewController, 
    public app: App, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    public navCtrl: NavController, 
    public actionSheetCtrl: ActionSheetController
  ) {
    this.article_id = this.navParams.get("id");
    this.board_id = this.navParams.get("board_id");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  ngOnInit() {
    this.article = new Article(0,0,"","",0,0,0,"",0);
    this.getArticle()
    this.commentList()
  }

  // 게시글 정보 가져오기
  getArticle() {
    this.articleService.getArticle(this.board_id, this.article_id)
      .then(article => this.article = article)
  }

  // 수정 토글
  handleToggleEdit() {
    this.toggleEdit = !this.toggleEdit;
  }

  // 수정 완료
  editArticle() {
      this.articleService.editArticle(this.article)
        .then(() => console.log('edit ok'))
      this.Toast('수정되었습니다.')
      this.dismiss();
  }

  // 덧글 목록
  commentList() {
    this.commentService.commentList(this.article_id)
      .then(comments => {
        this.comments = comments
        console.log(this.comments)
      })
  }

  // 덧글 생성
  commentCreate() {
    let comment: Comment = new Comment(this.article_id, this.USERID, this.createContent);
    this.commentService.commentCreate(comment)
      .then( () => {
        this.Toast('덧글이 생성 되었습니다.');
        this.dismiss();
      })
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  presentCommentSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '작업 선택',
      buttons: [
        {
          text: '수정',
          handler: () => { }
        },
        {
          text: '삭제',
          role: 'destructive',
          handler: () => { }
        },
        {
          text: '취소',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  showDeleteAlert(article) {
    let confirm = this.alertCtrl.create({
      title: '이 글을 삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          handler: () => {
            console.log('취소 clicked');
          }
        },
        {
          text: '삭제하기',
          handler: () => {
            this.articleService.deleteArticle(article.id);
            this.Toast('게시글이 삭제되었습니다');
            if(article.board_id == 2){
              setTimeout(() => { 
                this.app.getRootNav().setRoot(NoticePage);
                }, 300);
                this.dismiss();
            }
            if(article.board_id == 3){
              setTimeout(() => { 
                this.app.getRootNav().setRoot(QuestionPage);
                  }, 300);
                this.dismiss();
            }

          }
        }
      ]
    });
    confirm.present();
  }

  showAnswerAlert(article){
    let confirm = this.alertCtrl.create({
      title: '답변 완료하시겠습니까?',
      buttons: [
        {
          text: '취소',
          handler: () => {
            console.log('취소 clicked');
          }
        },
        {
          text: '완료하기',
          handler: () => {
            this.adminService.updateAnswer(article.id);
            this.Toast('답변이 완료되었습니다');
            if(article.board_id == 2){
              setTimeout(() => { 
                this.app.getRootNav().setRoot(NoticePage);
                }, 300);
                this.dismiss();
            }
            if(article.board_id == 3){
              setTimeout(() => { 
                this.app.getRootNav().setRoot(QuestionPage);
                  }, 300);
                this.dismiss();
            }

          }
        }
      ]
    });
    confirm.present();
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
