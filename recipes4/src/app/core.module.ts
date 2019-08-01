import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService, 
        {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}
    ]
})
export class CoreModule {
}
/**
 * You can extract out the providers array in app.module to such core module.
 * And import it to app.module
 * 
 * Purpose is:
 * 1. Keep the app.module lean
 * 2. List all application wide services in one place.
 * 
 * ALTERNATIVE:
 * 1. Use providedIn: 'root' for service, still Interceptors need to be declared in providers array.
 * @Injectable({ providedIn: 'root' })
 * export class DataStorageService {
 * ...
 * }
 */