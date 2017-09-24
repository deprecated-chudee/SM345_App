import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { WritePage } from '.././write/write';

@Component({
  templateUrl: 'reading.html'
})
export class ReadingPage {

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

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

  openWritePage() {
    this.navCtrl.push(WritePage);
  }
}
