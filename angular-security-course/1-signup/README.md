## Angular Security MasterClass - Web Security Fundamentals Course

### Inital client / server impl:

#### TODOs:
* signup & store password [securely??]
* signin & return basic user details
* handle error if any
* Change menu's as per user state

#### Auth Service
* communicate with remote using http
* will contain user's data/state
* will have default state anonymous
    * Setup Observable for user
    * Will you consume user$ Observable directly in views or will you derive some other Observables? Why? Will simplify UI code. No need to repeate checking of observable and its properties. 
* Can Create User model (interface)


#### TIPS:

> While passing JSON payload, You can use shorthand. Key name will be same as var name.
```
return this.http.post<User>('/api/signup', {email, password})
```

> Convert any truthy variable into boolean. Apply double bang
```
!!user.id
```

> suffix $ for observable type variables.

> To prevent access to the "observer-side" of a Subject.
Why? Subject can work as observer also. Add subscribers and itself will subscribe to other observable - multicasting.

```
loggedInuser: Subject<User> = new BehaviorSubject(ANONYMOUS_USER);
user$: Observable<User> = this.loggedInuser.asObservable();
```

> Can have derived Observabled. (function chain)
```   
loggedInuser: Subject<User> = new BehaviorSubject(ANONYMOUS_USER);
user$: Observable<User> = this.loggedInuser.asObservable();
isLoggedIn$: Observable<boolean> = this.user$.pipe(map( user => !!user.id));
isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map( loggedIn => !loggedIn));
```

> How to update value for above Observers? 
* Use shareReplay operator to ensure request is sent just once. 
* Use tap operator to read value in observer chain and call next() on subject.
```
return this.http.post<User>('/api/signup', {email, password})
.pipe(
    shareReplay(),
    tap((user) => {
    this.loggedInuser.next(user);
    })
)
```

> Define type of map {keytype : value type}
```
const USERS: {[key: number]: DbUser} = {};
```