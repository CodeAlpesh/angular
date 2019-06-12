import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ServerElement } from '../shared/server-element.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  newServerName = '';
  
  @Output() serverCreated = new EventEmitter<ServerElement>();
  @ViewChild('newServerContent', {static: false}) serverContentElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverCreated.emit(
      new ServerElement(
        'server', 
        this.newServerName,
        this.serverContentElement.nativeElement.value));
  }

  onAddBlueprint() {
    this.serverCreated.emit(
      new ServerElement(
        'blueprint', 
        this.newServerName, 
        this.serverContentElement.nativeElement.value));
  }

}