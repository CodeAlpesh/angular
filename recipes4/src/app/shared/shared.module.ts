import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent
    ], 
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        LoadingSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule {
}
/**
 * There can be many shared modules ... Can be named better as per whats is grouped/bundled in to it.
 * Since it is meant to be reusable (used by other modules), 
 * => Export all declaration
 * => Export all modules required by self (like CommonModule), so that imported do not have to manage it.
 * 
 * Module can be imported in many other modules.
 * Component can be declared in only One module. 
 */