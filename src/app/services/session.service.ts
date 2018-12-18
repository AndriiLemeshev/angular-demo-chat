import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';

import {Session} from './session';

const url = '/api/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private static cacheKey: string = null;
  private static cached: Observable<Session> = null;

  constructor(private http: HttpClient) { }

  private calcCacheKey(username: string, password: string) {
    return username + ':' + password;
  }

  private fetchAndCache(username: string, password: string) {
    SessionService.cacheKey = this.calcCacheKey(username, password);
    return SessionService.cached = this.http.get<Session[]>(`${url}?name=${username}&password=${password}`)
      .pipe<Session>(map(([session]) => session))
      .pipe(shareReplay(1));
  }

  get(username: string = null, password: string = null): Observable<Session> {
    if (SessionService.cacheKey
      && (!username || !password || SessionService.cacheKey === this.calcCacheKey(username, password))) {
      return SessionService.cached;
    }

    return username && password ? this.fetchAndCache(username, password) : EMPTY;
  }
}
