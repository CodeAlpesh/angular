import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
  }
  
  onLogin() {
    this.authService.signin();
  }

  onLogout() {
    this.authService.signout();
  }

  onLoadServer(id: number) {
    this.router.navigate(
      ['/servers', id, 'edit'], 
      {
        queryParams: {allowEdit: 1},
        fragment: 'loading'
      }
    );
    
    //this.router.navigate(['servers'], {relativeTo : this.route});
    // Will generate - http://localhost:4200/servers/servers
    // There is no such path configured 
  }

}