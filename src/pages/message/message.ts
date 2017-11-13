import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { MessageService } from '../../app/message.service';

@Component({
  templateUrl: 'message.html'
})
export class MessagePage {

    private messages;
    private currentUser;

    constructor(
        public viewCtrl: ViewController,
        private messageService: MessageService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.messageList()
    }

    messageList() {
        this.messageService.messageList(this.currentUser.USERID)
          .then(messages => this.messages = messages)
    }

    handleRemove(m_id: any) {
        this.messageService.removeMessage(m_id)
            .then()
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
