import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private recipeServcie: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.
      subscribe(
        (params: Params) => {
          /*
          Bug Fix: editMode set to true in case of route /recipes/new 
          
          /recipes/new route will not have param id so, +params['id'] gives NaN
          (NaN != null) gives true. So editMode was set to true in case of /recipes/new 
          Why? NaN can not be compared with anything. NaN is a falsy value. NaN===true / NaN===false both will return false.
         
          So check if param is undefined and set editMode accordingly.
          Also in this case error on console was misleading. 
          In editMode the recipeId is set to NaN. The RecipesServei will return null. 
          Accessing name on null object was the error, but console suppresed this error on instead shoed following error.

          ERROR Error: formGroup expects a FormGroup instance. Please pass one in.          
          */
          
          // this.recipeId = +params['id'];
          this.recipeId = (params['id'] === undefined)? null :  +params['id'];

          this.editMode = this.recipeId != null;
          this.initializeForm();
        }
      );
  }

  onSubmit() {
    //can build Recipe type Object ... But structure of recipeForm is same as Recipe. 
    if(!this.editMode) {
      this.recipeServcie.addRecipe(this.recipeForm.value);
    } else {
      this.recipeServcie.updateRecipe((this.recipeId - 1), this.recipeForm.value);
    }
    this.navigateOneLevelUp();
  }

  onCancel() {
    this.navigateOneLevelUp();
  }

  private navigateOneLevelUp() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [ 
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onIngredientDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  initializeForm() {
    let recipeName = ''
    let recipeDescription = ''
    let recipeImagePath = ''
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeServcie.getRecipe(this.recipeId - 1);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      const ingredients = recipe.ingredients;

      if(ingredients) {
        ingredients.forEach((ingredient, index) => {
          recipeIngredients.push(
            new FormGroup({
              'name':  new FormControl(ingredient.name, Validators.required),
              'amount':  new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        })
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  //Defining "controls" property. Its NOT a getter method.  use as obj.controls
  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

}
