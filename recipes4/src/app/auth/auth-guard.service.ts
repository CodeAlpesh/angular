import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | 
        Observable<boolean | UrlTree> | 
        Promise<boolean | UrlTree> {
        
        //Router will subscribe to this Observable and will wait for it to get resolved. 
        return this.authService.user.pipe(
            map( (user) => {
                return !!user;
            }),
            tap((isAuthenticated) => {
                if(isAuthenticated) {
                    return true;
                }
                this.router.navigate(['/auth']);
            })
        );
    }
}