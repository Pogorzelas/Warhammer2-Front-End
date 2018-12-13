import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../services/character.service';

@Component({
  selector: 'app-combat-movement',
  templateUrl: './combat-movement.component.html',
  styleUrls: ['./combat-movement.component.scss']
})
export class CombatMovementComponent implements OnInit {
  movement: number;
  chargeAttack: number;
  run: number;

  constructor(private characterService: CharacterService) {
  }

  ngOnInit() {
    this.characterService.getSpeed().subscribe(speed => {
      this.movement = speed * 2;
      this.chargeAttack = speed * 4;
      this.run = speed * 6;
    });
  }
}
