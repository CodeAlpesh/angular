import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class ResipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        //return an Observable / Promise / Recipe Array
        //In case of Observable / Promise ... resolver/angular will subscribe to Observable / Promise.
        return this.dataStorageService.fetchData().pipe(
            catchError((error) => {
                
                console.log(error);
                // if error is returned then resolver will stop propogation and route is not loaded. App crashes. 
                // TODO: Not sure whether it's unsubscribes or not. Check when login/authentication is implemeted. 
                // return throwError(error);

                // return empty valye ... 
                // since expected is an observable that will return array of recipes, empty array in this case. 
                return of([]);
            })
        );
    }

}