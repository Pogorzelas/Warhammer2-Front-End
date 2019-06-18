import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { CharacterListComponent } from '../components/navigation-bar/character-list/character-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/character_generator', pathMatch: 'full' },
  { path: 'character_generator', component: NavigationBarComponent },
  { path: 'character_list', component: CharacterListComponent }
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
