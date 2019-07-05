import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     const serverId: number = +params["id"];
    //     this.server = this.serversService.getServer(serverId);
    //   }
    // );
  }

  onEditServer() {
    this.router.navigate(
      ['edit'], 
      {
        relativeTo: this.route,
        queryParams: {
          'foo': 'baz',
          'hi': 'ho'
        },
        queryParamsHandling: 'merge'
      });
  }

}