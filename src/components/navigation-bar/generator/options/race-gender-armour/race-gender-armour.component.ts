import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {CareerService} from '../../../../../services/career.service';

@Component({
  selector: 'app-race-gender-armour',
  templateUrl: './race-gender-armour.component.html',
  styleUrls: ['./race-gender-armour.component.css']
})
export class RaceGenderArmourComponent implements OnInit {
  race: string;
  gender: string;
  constructor(private characterService: CharacterService, private careerService: CareerService) { }

  ngOnInit() {
  }
  pickArmourOptions(option: string): void {
    this.careerService.setArmourOptions(option);
  }
  pickRace(race: string): void {
    this.race = race;
    this.characterService.setRace(race);
    this.careerService.setRace(race);
  }
  pickGender(gender: string): void {
    this.gender = gender;
    this.characterService.setGender(gender);
  }
  confirm(): void {
    this.characterService.startRoll();
  }
}
