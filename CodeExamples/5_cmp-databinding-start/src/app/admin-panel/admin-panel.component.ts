import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServerElement } from '../shared/server-element.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  newServerName = '';
  newServerContent = '';
  @Output() serverCreated = new EventEmitter<ServerElement>();

  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverCreated.emit(new ServerElement('server', this.newServerName,this.newServerContent));
  }

  onAddBlueprint() {
    this.serverCreated.emit(new ServerElement('blueprint', this.newServerName,this.newServerContent));
  }

}