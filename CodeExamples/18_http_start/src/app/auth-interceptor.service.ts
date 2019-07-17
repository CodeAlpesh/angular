import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log("Common request processing goes here")
        return next.handle(req).pipe(
            //you can use map to transfor the response body ... 
            tap( (event) => {
                if(event.type == HttpEventType.Response) {
                    console.log(event.body);
                }
            })
        );
    }

}