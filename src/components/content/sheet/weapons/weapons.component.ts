import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../services/career.service';
import {Weapon} from '../../../../interfaces/weapon';
import {CharacterService} from '../../../../services/character.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {

  weapons: Weapon[] = [];

  constructor(private characterService: CharacterService, private careerService: CareerService) {}

  ngOnInit() {
    // STARTING ITEM
    this.characterService.getConfirmationP1().subscribe( confirm => {
      if (confirm === true) {
        this.careerService.fetchWeaponInfo('sztylet').subscribe( (sztylet: Weapon) => {
          this.weapons.push(sztylet);
        });
      }
    });
    // CAREER ITEMS
    this.careerService.getWeapons().subscribe(weapon => {
      this.weapons.push(weapon);
    });
    this.careerService.getChosenWeapons().subscribe(weapon => {
      this.weapons.push(weapon);
    });
  }

}
