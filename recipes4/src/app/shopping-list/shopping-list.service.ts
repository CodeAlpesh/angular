import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientSelected = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 6),
        new Ingredient('Tomotoes', 3)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients.slice(index, index+1);
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    updateIngredient(index:number, ingredient: Ingredient) {
        this.ingredients[index].name = ingredient.name;
        this.ingredients[index].amount = ingredient.amount;
        this.ingredientsChanged.emit(this.getIngredients());
    }

}