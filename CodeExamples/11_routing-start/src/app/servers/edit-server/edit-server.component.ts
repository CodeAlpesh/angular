import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, UrlTree } from '@angular/router';
import { CanDeactivateComponent } from 'src/app/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  errorMessage: string = null;
  changesSaved: boolean = false;

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
        if(allowEdit === '1') {
          this.allowEdit = true;
        } else {
          this.allowEdit = false;
        }
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
    this.changesSaved = true;
  }

  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm("Changes are not saved and will be lost. Are you sure?");
    } else {
      return true;
    }
  }

}