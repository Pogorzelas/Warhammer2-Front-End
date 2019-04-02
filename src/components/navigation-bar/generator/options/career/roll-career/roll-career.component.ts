import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../../../services/career.service';
import {CharacterService} from '../../../../../../services/character.service';

@Component({
  selector: 'app-roll-career',
  templateUrl: './roll-career.component.html',
  styleUrls: ['./roll-career.component.scss']
})
export class RollCareerComponent implements OnInit {

  race: string;

  constructor(private careerService: CareerService, private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getRace().subscribe( race => {
      this.race = race;
    });
  }

  rollCareer() {
    this.careerService.rollCareer();
  }

}
