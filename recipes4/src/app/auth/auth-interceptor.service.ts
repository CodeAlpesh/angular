import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // I do not want to maintain a subscription to Subject in such cases. I need data on demand.
        // When i need data on demand: I need last event that occured. 
        // Use Behaviour subject and use take operator to retrieve last event data.
        
        /*
        this.authService.user.pipe(take(1)).subscribe((user)=> { 
            //the take operator will unsubscribe also.
            //But I can not return hhtp.get observable ffrom here. It should be returned at top level.
            //use exhastMap ... it will resolve existing Observable (i.e. extract value) and replace the Observable in chain.
        })
        */        
        return this.authService.user.
            pipe(
                //subscribe, take value and unsubscribe
                take(1),
                //replace with new Observable
                exhaustMap((user) => {
                    if(!user) {
                        return next.handle(req);
                    } else {
                        const modifiedReq = req.clone(
                            {params : new HttpParams().set("auth", user.token)}
                        )
                        return next.handle(modifiedReq);
                    }
                })    
            );
    }

}