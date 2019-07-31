import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeResolver } from './recipes/reipe-resolver-guard.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ResipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    // {path: '',  redirectTo: 'recipes', pathMatch: 'full' },
    {path: 'auth', component: AuthComponent},
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