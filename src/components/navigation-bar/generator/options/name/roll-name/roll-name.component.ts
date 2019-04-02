import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../../services/character.service';

@Component({
  selector: 'app-roll-name',
  templateUrl: './roll-name.component.html',
  styleUrls: ['./roll-name.component.scss']
})
export class RollNameComponent implements OnInit {

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
  }

  rollName() {
    this.characterService.rollName();
    this.characterService.confirmName();
  }

}
