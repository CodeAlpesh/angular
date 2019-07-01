import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("name", {static: false}) nameElement: ElementRef;
  @ViewChild("amount", {static: false}) amountElement: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onIngredientAdded() {
    const name = this.nameElement.nativeElement.value;
    const amount = this.amountElement.nativeElement.value;
    this.slService.addIngredient(new Ingredient(name, amount));
  }

}
