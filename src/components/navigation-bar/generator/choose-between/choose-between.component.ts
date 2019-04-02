import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../services/career.service';
import {CharacterService} from '../../../../services/character.service';

@Component({
  selector: 'app-choose-between',
  templateUrl: './choose-between.component.html',
  styleUrls: ['./choose-between.component.scss']
})
export class ChooseBetweenComponent implements OnInit {

    trappings = [];
    trappingsDisplay = [];
    skills = [];
    skillsDisplay = [];
    talents = [];
    talentsDisplay = [];
    end = '';

  constructor(private careerService: CareerService, private characterService: CharacterService) { }

  ngOnInit() {
    this.careerService.getEnd().subscribe( end => {
      this.end = end;
    });
    // RACE CHOICES
    this.characterService.getRaceSkill().subscribe( skills => {
      this.addSkills(skills);
    });
    this.characterService.getRaceTalents().subscribe( talents => {
      this.addTalents(talents);
    });
    this.characterService.getStartingTrappings().subscribe( trappings => {
      trappings.forEach( trapping => {
        this.addTrappings(trapping);
      });
    });
    // CAREER CHOICES
    this.careerService.getTrappings().subscribe( trappings => {
      this.addTrappings(trappings);
    });
    this.careerService.getSkills().subscribe( skills => {
      this.addSkills(skills);
    });
    this.careerService.getTalents().subscribe( talents => {
      this.addTalents(talents);
    });
  }
  // ADD FUNCTIONS
  addTrappings(trappings: string): void {
    if ( trappings.search(' lub ') !== -1) {
      this.trappings.push(trappings.split(' lub '));
      this.trappingsDisplay.push(true);
    }
  }

  addSkills(skills: string[]): void {
    skills.forEach( skill => {
      if ( skill.search(' lub ') !== -1) {
        this.skills.push(skill.split(' lub'));
        this.skillsDisplay.push(true);
      }
    });
  }

  addTalents(talents: string[]): void {
    talents.forEach( talent => {
      if ( talent.search(' lub ') !== -1) {
        this.talents.push(talent.split(' lub '));
        this.talentsDisplay.push(true);
      }
    });
  }
  // CHOOSE FUNCTIONS
  chooseTrapping(trapping: number, arr: number): void {
    this.careerService.chosenTrapping(this.trappings[arr][trapping]);
    this.trappingsDisplay[arr] = false;
    this.check();
  }

  chooseSkill(skill: number, arr: number): void {
    this.careerService.chosenSkill(this.skills[arr][skill]);
    this.skillsDisplay[arr] = false;
    this.check();
  }

  chooseTalent(talent: number, arr: number): void {
    this.careerService.chosenTalent(this.talents[arr][talent]);
    this.talentsDisplay[arr] = false;
    this.check();
  }

  check(): void { // do naprawy
    if (this.talentsDisplay[this.talentsDisplay.length - 1] === false &&
      this.trappingsDisplay[this.trappingsDisplay.length - 1] === false &&
      this.skillsDisplay[this.skillsDisplay.length - 1] === false &&
      this.end === '') {
      this.careerService.setFinish();
    }
  }

}
