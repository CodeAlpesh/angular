import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Tea", "Brewed to experience the magic.", "https://tse4.mm.bing.net/th?id=OIP.d8hkH1YbN8-Vt4tAAuuYLgHaFj&pid=Api&rs=1&p=0"),
    new Recipe("Coffee", "Brewed to experience the magic.", "https://c.pxhere.com/photos/34/bf/coffee_glass_beverage_coffee_mug_caffeine_drink_coffee_shop_atmosphere-549599.jpg!d"),
    new Recipe("LemoTea", "Brewed to experience the magic.", "https://pixnio.com/free-images/2018/10/05/2018-10-05-20-49-37-1200x789.jpg")
  ]
  
  constructor() { }

  ngOnInit() {
  }

}