import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'messageAdd.html'
})
export class MessageAddPage {

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  messageAdd() {
    let toast = this.toastCtrl.create({
		message: '쪽지가 전송되었습니다.',
		duration: 3000,
		position: 'bottom',
		});
		toast.present();
   }
}
