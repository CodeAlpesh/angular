### Observable ... Subject ... Observer

## Q&A:

* https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs
*  When you don't want to leak the "observer-side" of a Subject out of your API. (Basically to prevent leaky abstraction).

## Type of Subjects:
> https://coryrylan.com/blog/rxjs-observables-versus-subjects

## What is it? 
> https://medium.com/@benlesh/on-the-subject-of-subjects-in-rxjs-2b08b7198b93

## “Gang Of Four” Observer Pattern.

Subjects and Observers are core of Observer pattern.

> Observable => Wrap registering the handler on button(subject) via addEventListener

```
// This is better, but use Observable.fromEvent(button, 'click')
// instead, please.

const clicks = new Observable(observer => {
  let btn = document.getElementById('button123');
  // handler function
  const handler = (e) => observer.next(e);
  // registering handler to subject
  btn.addEventListener('click', handler);
  // unsubscribe
  return () => btn.removeEventListener('click', handler);
});

const sub = clicks.subscribe((e) => console.log(e.x));
setTimeout(() => {
  console.log('done ...');
  sub.unsubscribe();
}, 10000);
```

#### Subject:
- Manage list of Observers
- On Event notify all

#### Observer:
- notify
- error
- complete

Observables aren’t something you’ll find in the GoF’s Design Patterns.
RxJS is mostly about Observables and Observers
Subjects in RxJS aren’t much different:
Example:
```
const subject = new Subject();
// add observer1 to the list of observers
const sub1 = subject.subscribe(observer1);
// add observer2 to the list of observers
const sub2 = subject.subscribe(observer2);

// notify all observers in the list with "hi there"
subject.next('hi there');

// remove observer1 from the list
sub1.unsubscribe();
```

In RxJS, Subjects even inherit from Observable. Advantage is that all Subjects then have same operators and methods available to them as Observables do.

Probably a more important distinction between Subject and Observable is that a Subject has state, it keeps a list of observers. On the other hand, an Observable is really just a function that sets up observation.

Subjects are Observables, Subjects also implement an Observer interface. This means a subject can be used as an observer to subscribe to any observable.

```
// To "share" the observable tick$ with two observers,
// observer1 and observer2, we can pipe all notifications
// through a Subject, like so
const tick$ = Observable.interval(1000);
const subject = new Subject();
subject.subscribe(observer1);
subject.subscribe(observer2);
tick$.subscribe(subject);
```

The example above is “multicasting” the observable tick$ to two observers: observer1 and observer2.


Subjects cannot be reused. That is to say, when a Subject completes or errors, it can no longer be used. 


Examples:
```
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

fromEvent(document, 'click')
	.pipe(scan(count => count + 1, 0))
	.subscribe(count => console.log(`Clicked ${count} times`));


import { fromEvent } from 'rxjs';
fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

** Under the hood
import { Observable } from 'rxjs';

const clicks = new Observable(observer => {
  let button = document.getElementById('button123');
  // handler function
  const handler = (e) => observer.next(e);
  // registering handler to subject
  button.addEventListener('click', handler);
  // unsubscribe
  return () => button.removeEventListener('click', handler);
});

**
import { Observable } from 'rxjs';

const observable = new Observable(observer => {
	setInterval(() => observer.next('hello from Observable!'), 1000);
});

let count = 1;
var sub = observable.subscribe(v => console.log(count++ + ' ' + v));
setTimeout(() => {
	sub.unsubscribe();
}, 10000);


**
import { Observable } from 'rxjs';

const clicks = new Observable(observer => {
  let button = document.getElementById('button123');
  // handler function
  const handler = (e) => observer.next(e);
  // registering handler to subject
  button.addEventListener('click', handler);
  // unsubscribe
  return () => button.removeEventListener('click', handler);
});

console.log('Subscribed @ .. ' + new Date());
const subscription = clicks.subscribe((e:Event) => {
  console.log(e.clientX);
});
console.log(subscription);
// Subscriber {closed: false, _parentOrParents: null, _subscriptions: Array[1], syncErrorValue: null…}

setTimeout(() => {
  console.log('done @' + new Date());
  if(subscription) {
    subscription.unsubscribe();
  }
}, 10000);

```


> RxJS | Pattern | Service handles happy and error paths.
#### Service:
* The map/tap operator to update the Subject(i.e. dependant obserables ...)
* The catchError to handle error and return default values.
#### Component:
* Subscribe in UI with async pipe.
* May be subscribe at service level.
#### Express:
* If using async function .. it returns promise and will be executed .. but next will not wait for it.
* So return response in then/catch cases.
* Catch clause for sure.
