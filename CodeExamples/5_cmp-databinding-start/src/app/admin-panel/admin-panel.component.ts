import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  newServerName = '';
  newServerContent = '';
  @Output() serverCreated = new EventEmitter<{type: string, name: string, content: string}>();

  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverCreated.emit({type: 'server', name: this.newServerName, content: this.newServerContent});
  }

  onAddBlueprint() {
    this.serverCreated.emit({type: 'blueprint', name: this.newServerName, content: this.newServerContent});
  }

}