import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule
  ],
  declarations: [
    HeaderContainerComponent,
    NavigationComponent
  ],
  exports: [
    HeaderContainerComponent
  ]
})
export class LayoutModule { }
