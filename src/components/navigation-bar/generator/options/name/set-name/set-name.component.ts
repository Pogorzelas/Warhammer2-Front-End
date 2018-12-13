import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../../services/character.service';

@Component({
  selector: 'app-made-name',
  templateUrl: './set-name.component.html',
  styleUrls: ['./set-name.component.scss']
})
export class SetNameComponent implements OnInit {

  constructor(private characterService: CharacterService) { }
  name: string;
  hide = <boolean> false;
  ngOnInit() {
  }
  sendName() {
    if ( this.name !== undefined && this.name !== '' ) {
      this.characterService.setName(this.name);
      this.characterService.confirmName();
    } else {
      this.hide = true;
    }
    }
}
