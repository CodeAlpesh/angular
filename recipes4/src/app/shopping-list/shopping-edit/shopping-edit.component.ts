import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("name", {static: false}) nameElement: ElementRef;
  @ViewChild("amount", {static: false}) amountElement: ElementRef;

  @Output() newIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded() {
    const name = this.nameElement.nativeElement.value;
    const amount = this.amountElement.nativeElement.value;
    this.newIngredient.emit(new Ingredient(name, amount));
  }

}
