import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ChatMessage} from './chat-message';

const url = '/api/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  fetchAll(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${url}?_sort=id&_order=asc`);
  }

  send(username: string, text: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(url, {username, timestamp: new Date().getTime(), text});
  }
}
