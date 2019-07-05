import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./auh-guard.service";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { ServerResolver } from "./servers/server-resolver.service";

const appRoutes: Routes = [
    {path: "", component: HomeComponent, pathMatch: "full" },
    {path: "users", component: UsersComponent, children:[
      {path: ":id/:name", component: UserComponent },
    ] },
    {path: "servers", component: ServersComponent, canActivateChild :[AuthGuard], children: [
      {path: ":id", component: ServerComponent, resolve: {server : ServerResolver} },
      {path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}