import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: '',
  userName: 'Guest'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInuser: Subject<User> = new BehaviorSubject(ANONYMOUS_USER);
  
  user$: Observable<User> = this.loggedInuser.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map( user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map( loggedIn => !loggedIn));

  //to debug ... use tap operator (breakpoint or connsole.log)
  // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map( loggedIn => !loggedIn), tap(v => console.log('isLoggedOut$' + v)));

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<User>('/api/signup', {email, password})
    .pipe(
      shareReplay(),
      tap((user) => {
        this.loggedInuser.next(user);
      })
    )

  }

}
