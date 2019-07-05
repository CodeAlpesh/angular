import { Resolve } from "@angular/router";
import { ServersService } from "./servers.service";
import { Injectable } from "@angular/core";

interface Server {
    id: number,
    name: string,
    status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
    
    constructor(private serversService: ServersService) {}

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot)
        : Server | import("rxjs").Observable<Server> | Promise<Server> {
        
        const promise = new Promise<Server>(
            (resolve, reject) => {
                const serverId = +route.params["id"];
                const server: Server = this.serversService.getServer(serverId);
                resolve(server);
            }
        );
        return promise;
    }

}