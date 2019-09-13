import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  option: number;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
  }

  chooseOption(option: number): void {
    this.option = option;
    if ( this.option === 2) {
      this.characterService.chooseName();
    }
  }

}
