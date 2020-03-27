import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BackgroundImageDirective } from '../../directives/background-image.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BackgroundImageDirective
    ],
    exports: [
        BackgroundImageDirective
    ]
})
export class UmsDirectivesModule { }
