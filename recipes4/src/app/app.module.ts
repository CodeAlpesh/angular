import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [ 
    ShoppingListService, 
    RecipeService, 
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * The routes arrays from different routing modules will be concatenated in the order in which 
 * the related routing modules are imported.
 * Thus it is important that AppRoutingModule is the last imported one if it contains a wildcard route.
 * If module with wildcard (AppRoutingModule in this case) is before RecipeModule, the recipe routes will never be reached.
 * Routes like /recipe/1 and /recipe/new etc. will show /recipe
 */