import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { all } from 'q';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
    
    constructor(private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        
        const promise = new Promise<Recipe>(
            (resolve, reject) => {
                let recipeIndex: number = +route.params['id'];
                recipeIndex = recipeIndex - 1; //adjust for zero based index
                const recipe = this.recipeService.getRecipe(recipeIndex);
                resolve(recipe);
            }
        );
        return promise;
    }
    
}