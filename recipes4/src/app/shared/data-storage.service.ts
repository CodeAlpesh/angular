import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';



@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

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
        this.http.
            get<Recipe[]>('https://recipebook-36c22.firebaseio.com/recipes.json')
            .pipe(
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
                })
            )
            .subscribe(
                (recipes) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
            
    }
}