import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    CoreModule
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