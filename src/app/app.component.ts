import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import {CareerService} from '../services/career.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CharacterService, CareerService ]
})
export class AppComponent {
}
