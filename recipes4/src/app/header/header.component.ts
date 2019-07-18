import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(private dataService: DataStorageService) {}

  ngOnInit() {
  }

  onSaveData() {
    this.dataService.saveData();
  }

  onFetchData() {
    this.dataService.fetchData().subscribe();
    //Not intesersted in processing the response. It's already set in service and notified via Subject.
  }

}
