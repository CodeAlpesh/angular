import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  errorMessage: string = null;

  constructor(
    private serversService: ServersService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const serverId: number = +params['id'];
        this.server = this.serversService.getServer(serverId);
        
        if(this.server) {
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
          this.errorMessage = undefined;
        } else {
          this.errorMessage = "Data not available.";
        }
      }
    )

    // const allowEdit = this.route.snapshot.queryParams['allowEdit'];
    this.route.queryParams.subscribe(
      (params: Params) => {
        const allowEdit = params['allowEdit'];
      }
    );

    // const fragmentvalue = this.route.snapshot.fragment;
    this.route.fragment.subscribe(
      (fragment) => {
        const fragmentvalue = fragment;
      }
    );

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
