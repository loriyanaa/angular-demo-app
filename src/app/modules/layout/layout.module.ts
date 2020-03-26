import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  declarations: [
    HeaderContainerComponent,
    NavigationComponent,
    LoaderComponent
  ],
  exports: [
    HeaderContainerComponent,
    LoaderComponent
  ]
})
export class LayoutModule { }
