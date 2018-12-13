import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import {CareerService} from '../../../../services/career.service';


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],

})
export class CharacterComponent implements OnInit {
  // VARIABLES
  name: string;
  race: string;
  career: string;
  constructor(private characterService: CharacterService, private careerService: CareerService) { }
  ngOnInit() {
    this.characterService.getRace().subscribe( race => {
      this.race = race;
    });
    this.characterService.getName().subscribe( name => {
      this.name = name;
    });
    this.careerService.getCareerName().subscribe( career => {
      this.career = career;
    });
  }
}
