import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            "Tea", 
            "Brewed to experience the magic.", 
            "https://tse4.mm.bing.net/th?id=OIP.d8hkH1YbN8-Vt4tAAuuYLgHaFj&pid=Api&rs=1&p=0",
            [
                new Ingredient("Tea Leaves", 1),
                new Ingredient("Sugar", 1),
                new Ingredient("Spices", 1),
                new Ingredient("Milk", 1)
            ]
        ),
        new Recipe(
            "Coffee", 
            "Brewed to experience the magic.", 
            "https://c.pxhere.com/photos/34/bf/coffee_glass_beverage_coffee_mug_caffeine_drink_coffee_shop_atmosphere-549599.jpg!d",
            [
                new Ingredient("Coffee", 1),
                new Ingredient("Sugar", 1),
                new Ingredient("Milk", 1)
            ]
        ),
        new Recipe(
            "Lemon Tea", 
            "Brewed to experience the magic.", 
            "https://4.imimg.com/data4/GC/RY/MY-2067796/lemon-tea-500x500.png",
            [
                new Ingredient("Tea Leaves", 1),
                new Ingredient("Honey", 1),
                new Ingredient("Lemon", 1),
                new Ingredient("Hot Water", 1)
            ]
        )
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

}