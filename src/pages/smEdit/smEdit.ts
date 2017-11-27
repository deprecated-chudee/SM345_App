import { Component } from '@angular/core';
import { ToastController, NavController, NavParams, ViewController, App, AlertController } from 'ionic-angular';
import { SmPage } from '.././sm/sm';

import { ArticleService } from '../../services/article.service';

import { Article } from '../../models/article';

@Component({
  templateUrl: 'smEdit.html'
})
export class SmEditPage {
    private article: Article;
    private board_id;
    private currentUser;
    private USERID;
    private count:number=1;

    constructor(
        private articleService: ArticleService, 
        public app: App, 
        public toastCtrl: ToastController, 
        public viewCtrl: ViewController, 
        public navParams: NavParams,  
        public alertCtrl: AlertController
    ) {
        this.board_id = this.navParams.get("board_id");
        this.article = new Article(0, '', '', '');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    showAlert(ms:string) {
        let alert = this.alertCtrl.create({
        title: ms,
        buttons: ['OK'],
        });
        alert.present();    
    }

    //사업설명서 추가 저장 버튼 누를 시
    smWriteSubmit() {
        this.article.board_id = this.board_id;
        this.article.article_writer = this.USERID;
        this.articleService.creatArticle(this.article)
        this.presentToast('SM사업 설명이 추가되었습니다.');

        setTimeout(() => { 
        this.app.getRootNav().setRoot(SmPage);
        }, 300);
        this.dismiss();
        //this.navCtrl.pop();
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
