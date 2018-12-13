import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LogComponent} from '../components/log/log.component';
import {NavigationBarComponent} from '../components/navigation-bar/navigation-bar.component';
import {CharacterListComponent} from '../components/navigation-bar/character-list/character-list.component';
import {RegistrationComponent} from '../components/log/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/log', pathMatch: 'full' },
  { path: 'log', component: LogComponent },
  { path: 'registration', component: RegistrationComponent },
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
