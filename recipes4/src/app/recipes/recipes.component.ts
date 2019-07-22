import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  errorMessage: string = null;
  recipesChangedSubscription: Subscription;
  // recipesDataSubscriptin: Subscription;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService) {}

  ngOnInit() {

    //Option1: Either let data service inform you about data change ... which can be reused by many components.
    //OR
    //chack Option2: 
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(
      (data) => {
        this.errorMessage = this.recipeService.getRecipesError();
      }
    )
    this.errorMessage = this.recipeService.getRecipesError();

    //Option2: Let resolver get the data and subscribe to receive data. May do it if data is must for this component.
    // Will not be invoked when error occurs in resolver.
    // this.recipesDataSubscriptin = this.route.data.subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // )

  }

  ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
    // this.recipesDataSubscriptin.unsubscribe();
  }

}