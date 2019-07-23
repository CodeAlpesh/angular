import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  isAuthenticated = false;

  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.
      subscribe((user) => {
        this.isAuthenticated = !!user;
      })
  }

  onSaveData() {
    this.dataService.saveData();
  }

  onFetchData() {
    this.dataService.fetchData().subscribe();
    //Not intesersted in processing the response. It's already set in service and notified via Subject.
  }

}
