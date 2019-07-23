import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, tap, catchError, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

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
        return this.http.
            get<Recipe[]>('https://recipebook-36c22.firebaseio.com/recipes.json').
            pipe(
                tap((recipes) => {
                    //no need to return
                    console.log(recipes);
                })
                , map((recipes) => {
                    //must return
                    return recipes.map((recipe: Recipe) => {
                        const recipeWithIngredients = { ...recipe, ingredients: (recipe.ingredients) ? recipe.ingredients : [] };
                        return recipeWithIngredients;
                    });
                })
                , tap((recipes) => {
                    console.log(recipes);
                    this.recipeService.setRecipes({ recipes: recipes, error: null });
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    this.recipeService.setRecipesError({
                        recipes: [], error: {
                            error: errorResponse.error.error,
                            message: errorResponse.message,
                            status: String(errorResponse.status)

                        }
                    });
                    return throwError(errorResponse);
                })
            
            );
    }
}