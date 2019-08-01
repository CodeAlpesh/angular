import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ResipesResolverService } from './recipes-resolver.service';

const recipeRoutes: Routes = [
    {path: '', component: RecipesComponent, canActivate:[AuthGuard], children:[
        {path: 'new', component: RecipeEditComponent },
        // {path: ':id', component: RecipeDetailsComponent, resolve: { recipe : RecipeResolver }},
        {path: ':id', component: RecipeDetailsComponent, resolve: [ResipesResolverService] },
        {path: ':id/edit', component: RecipeEditComponent, resolve: [ResipesResolverService]}
    ] }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]   
})
export class RecipeRoutesModule {
}