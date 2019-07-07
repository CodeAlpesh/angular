import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalSunscription;

  constructor() { }

  ngOnInit() {
    this.intervalSunscription = interval(2000).subscribe(
      (count: number) => {
        console.log(count);
      }
    );
  }

  ngOnDestroy(): void {
    this.intervalSunscription.unsubscribe();
  }
}