import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, tap, catchError, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService) {}

    saveData() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://recipebook-36c22.firebaseio.com/recipes.json', recipes)
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    fetchData() {

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
                    return this.http.
                        get<Recipe[]>(
                            'https://recipebook-36c22.firebaseio.com/recipes.json',
                            {
                                params: new HttpParams().set("auth", user.token)
                            }
                        )
                }),
                tap((recipes) => {
                    //no need to return
                    console.log(recipes);    
                })
                ,map((recipes) => {
                    //must return
                    return recipes.map((recipe: Recipe) => {
                        const recipeWithIngredients = {...recipe, ingredients : (recipe.ingredients) ? recipe.ingredients : [] };
                        return recipeWithIngredients;
                    });
                })
                ,tap((recipes) => {
                    console.log(recipes);
                    this.recipeService.setRecipes({recipes: recipes, error: null});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    this.recipeService.setRecipesError({recipes: [], error: {
                        error: errorResponse.error.error,
                        message: errorResponse.message,
                        status: String(errorResponse.status)

                    }});
                    return throwError(errorResponse);
                })
            );
    }
}