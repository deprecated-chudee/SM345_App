import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams, LoadingController } from 'ionic-angular';

import { MessageService } from '../../services/message.service';

import * as _ from 'lodash';

@Component({
  templateUrl: 'messageAdd.html'
})
export class MessageAddPage {
    private selectedUser = [];
    public selectedUsername = [];
    private currentUser;
    public message = {
        to_id: '',
        from_id: '',
        title: '',
        content: ''
    }

    constructor(
        public viewCtrl: ViewController, 
        public toastCtrl: ToastController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private messageService: MessageService
    ) {
        this.selectedUser = this.navParams.get('selectedUser')
        this.getUsername()
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
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

    async getUsername() {
        let loading = await this.loadingCtrl.create({
            content: 'Loading...'
        });

        await loading.present();
        
        this.selectedUsername = await _.map(this.selectedUser, u_id => {
            return this.messageService.getUsername(u_id)
                .then(username => username)
                .catch(e => {
                    loading.dismiss()
                    this.Toast('Error')
                })
        })
        await loading.dismiss()
    }

    createMessage() {
        this.selectedUser.forEach(e => {
            let message = {
                to_id: e,
                from_id: this.currentUser.USERID,
                message_title: this.message.title,
                message_content: this.message.content
            }
            this.messageService.createMessage(message)
                .then(() => this.Toast('쪽지가 전송되었습니다.'))
                .catch(() => this.Toast('Error'))  
        })
    }
}
