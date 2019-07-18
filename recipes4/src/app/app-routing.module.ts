import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeResolver } from './recipes/reipe-resolver-guard.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ResipesResolverService } from './recipes/recipes-resolver.service';

const appRoutes: Routes = [
    {path:'',  redirectTo: 'recipes', pathMatch: 'full' },
    {path: 'recipes', component: RecipesComponent, resolve: [ResipesResolverService], children:[
        {path: 'new', component: RecipeEditComponent },
        // {path: ':id', component: RecipeDetailsComponent, resolve: { recipe : RecipeResolver }},
        {path: ':id', component: RecipeDetailsComponent },
        {path: ':id/edit', component: RecipeEditComponent}
    ] },
    {path: 'shopping', component: ShoppingListComponent },
    {path: '**', redirectTo: 'recipes'}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}