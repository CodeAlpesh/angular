import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'recipes4';
  selectedFeature = '';

  onNavigation(featureName: string) {
    this.selectedFeature = featureName;
  }

  showRecipesComponent() {
    return !this.selectedFeature || this.selectedFeature === 'recipes'; 
  }

  showShoppingListComponent() {
    return this.selectedFeature === 'shopping-list';
  }

}
