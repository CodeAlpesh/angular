import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, tap, shareReplay, filter, catchError } from 'rxjs/operators';
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

  loggedInuser: Subject<User> = new BehaviorSubject(undefined);
  
  user$: Observable<User> = this.loggedInuser.asObservable().pipe(filter(user => !!user)); // filter non truthy values
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map( user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map( loggedIn => !loggedIn));

  //to debug ... use tap operator (breakpoint or connsole.log)
  // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map( loggedIn => !loggedIn), tap(v => console.log('isLoggedOut$' + v)));

  constructor(private http: HttpClient) {
    //on service init check user session existance on server.
    this.http.get<User>("/api/user").
      subscribe((user) => {
        let nextUser = user ? user : ANONYMOUS_USER
        this.loggedInuser.next(nextUser);
      },
      (err) => console.log("Something went wrong" + err));
  }

  signup(email: string, password: string) {
    return this.http.post<User>('/api/signup', {email, password})
    .pipe(
      shareReplay(),
      tap((user) => {
        this.loggedInuser.next(user);
      })
    )

  }

  signout() {
    return this.http.post('/api/logout', {}).
      pipe(tap((user) => {
        this.loggedInuser.next(ANONYMOUS_USER)
      }));
  }

}