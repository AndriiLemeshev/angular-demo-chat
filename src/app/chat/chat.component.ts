import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {interval} from 'rxjs';

import {ChatMessage, ChatService, SessionService} from '../services';

const msecInSec = 1000;

@Component({
  selector: 'ca-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @ViewChild('logContainer') private logContainer: ElementRef;

  username: string = null;
  log: ChatMessage[] = [];
  message = '';

  constructor(
    private sessionService: SessionService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.sessionService.get().subscribe(session => this.username = session.name);
    interval(msecInSec).subscribe(() => this.fetchLog());
  }

  private fetchLog() {
    this.chatService.fetchAll().subscribe(log => {
      if (this.log.length !== log.length) {
        this.log = log;
        this.scrollDown();
      }
    });
  }

  send() {
    if (this.message.trim().length === 0) {
      this.message = '';
      return;
    }

    this.chatService.send(this.username, this.message).subscribe(() => {
      this.message = '';
      this.scrollDown();
    });
  }

  scrollDown() {
    try {
      setTimeout(() =>
        this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight, 100);
    } catch (err) { /* ignore */ }
  }
}
