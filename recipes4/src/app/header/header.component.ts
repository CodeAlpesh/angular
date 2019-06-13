import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();

  collapsed = true;

  constructor() { }

  ngOnInit() {
  }

  onFeatureSelected(featureName: string) {
    this.featureSelected.emit(featureName);
  }

}
