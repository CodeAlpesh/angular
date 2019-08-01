import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {path: '',  redirectTo: 'recipes', pathMatch: 'full' },
    {path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'},
    {path: 'shopping', loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
    {path: 'auth', loadChildren:'./auth/auth.module#AuthModule'},
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