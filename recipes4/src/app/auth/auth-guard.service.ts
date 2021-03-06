import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | UrlTree | 
        Observable<boolean | UrlTree> | 
        Promise<boolean | UrlTree> {
        
        console.log(state.url);
        //Router will subscribe to this Observable and will wait for it to get resolved. 
        return this.authService.user.pipe(
            take(1),
            map( (user) => {
                const isAuthenticated = !!user; 
                if(isAuthenticated) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }
}