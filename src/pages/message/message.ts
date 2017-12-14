import { Component, OnInit } from '@angular/core';
import { 
    ViewController, 
    ToastController,
    LoadingController, 
    NavController } from 'ionic-angular';

import { MessageService } from '../../services/message.service';

@Component({
  templateUrl: 'message.html'
})
export class MessagePage implements OnInit {

    private messages = [];
    private currentUser;

    constructor(
        public viewCtrl: ViewController,
        public messageService: MessageService,
        public toastCtal: ToastController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    ngOnInit() {
        this.getList()
    }

    getList() {
        this.messageService.messageList(this.currentUser.USERID)
          .then(messages => this.messages = messages)
    }

    handleRemove(m_id: number) {
        this.messageService.removeMessage(m_id)
            .then(() => {
                this.toast('해당 쪽지가 삭제되었습니다.')
                this.loading()
            })
    }

    toast(message) {
        let toast = this.toastCtal.create({
            message: message,
            duration: 3000,
            position: 'bottom',
        });
        toast.present();
    }

    loading() {
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
          });
        
          loading.present();
        
          setTimeout(() => {
            loading.dismiss();
          }, 1000);

          // 새로고침
          this.navCtrl.setRoot(MessagePage)
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
