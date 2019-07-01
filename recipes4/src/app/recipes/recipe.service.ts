import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("Tea", "Brewed to experience the magic.", "https://tse4.mm.bing.net/th?id=OIP.d8hkH1YbN8-Vt4tAAuuYLgHaFj&pid=Api&rs=1&p=0"),
        new Recipe("Coffee", "Brewed to experience the magic.", "https://c.pxhere.com/photos/34/bf/coffee_glass_beverage_coffee_mug_caffeine_drink_coffee_shop_atmosphere-549599.jpg!d"),
        new Recipe("LemoTea", "Brewed to experience the magic.", "https://4.imimg.com/data4/GC/RY/MY-2067796/lemon-tea-500x500.png")
    ];

    getRecipes() {
        return this.recipes.slice();
    }

}