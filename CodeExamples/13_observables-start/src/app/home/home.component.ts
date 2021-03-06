import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subscriber } from 'rxjs'
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalSunscription: Subscription;

  constructor() { }

  ngOnInit() {

  const myObservable:Observable<number> = Observable.create((observer: Subscriber<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count == 3) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error("Count is greater then 3"));
        }
        count++;
      }, 1000);
  });
  const myObservable2  = myObservable.pipe(
    filter( (data) => {
      return data > 0;
    }),
    map( (data) => {
      return 'Round: ' + data;
    })
  );

  this.intervalSunscription = myObservable2.subscribe(
    (data) => {
      console.log(data);
    },
    (error: Error) => {
      console.log('ERROR: ' + error.message);
    },
    () => {
      console.log("Completed ...");  
    })

    /*
    this.intervalSunscription = interval(2000).subscribe(
      (count: number) => {
        console.log(count);
      }
    );
    */
  }

  ngOnDestroy(): void {
    this.intervalSunscription.unsubscribe();
  }

}