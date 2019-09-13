import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';

const routes: Routes = [
  { path: '', redirectTo: '/character-generator', pathMatch: 'full' },
  { path: 'character-generator', component: NavigationBarComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
