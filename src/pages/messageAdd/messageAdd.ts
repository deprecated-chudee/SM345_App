import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams } from 'ionic-angular';
import { MessageService } from '../../app/message.service';

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
        private messageService: MessageService
    ) {
        this.selectedUser = this.navParams.get('selectedUser')
        this.selectedUser.forEach( e => this.getUsername(e) )
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
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

    getUsername(u_id: any) {
        this.messageService.getUsername(u_id)
            .then(username => this.selectedUsername.push(username))
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
                .then(res => console.log(res))
            this.messageAdd()
        })
    }
}
