import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class ResipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        //return an Observable / Promise / Recipe Array
        //In case of Observable / Promise ... resolver/angular will subscribe to Observable / Promise.
        return this.dataStorageService.fetchData();
    }

}