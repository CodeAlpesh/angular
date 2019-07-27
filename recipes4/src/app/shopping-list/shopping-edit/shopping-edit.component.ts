import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm', {static: false}) form: NgForm;
  @Output('reset') reset = new EventEmitter<void>(); 

  isEditMode = false;
  editIndex = -1;
  private ingredientSelectedSubscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredientSelectedSubscription = this.slService.ingredientSelected.
    subscribe((index) => {
        this.editIndex = index;
        let ingredient:Ingredient = this.slService.getIngredient(index)[0];
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
        this.isEditMode = true;
      })
  }

  onSubsmit() {
    const name = this.form.value.name;
    const amount = this.form.value.amount;

    if(this.isEditMode) {
      this.slService.updateIngredient(this.editIndex, new Ingredient(name, amount));
    } else {
      this.slService.addIngredient(new Ingredient(name, amount));
    }

    this.isEditMode = false;
    this.form.reset();
  }

  onClear() {
    this.isEditMode = false;
    this.form.reset();
    this.reset.emit();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.ingredientSelectedSubscription.unsubscribe();
  }

}
