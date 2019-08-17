import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../model/user.model';

const ANONYMOUS_USER: User = {
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

  constructor() { }

  signup(email: string, password: string) {

  }

}
