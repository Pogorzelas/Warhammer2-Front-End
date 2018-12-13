import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../services/career.service';
import {CharacterService} from '../../../../services/character.service';
import {Skill} from '../../../../interfaces/skill';
import {skip} from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  basicSkills = [
    { name: 'charakteryzacja',        taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'dowodzenie',             taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'hazard',                 taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'jeździectwo',            taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'mocna głowa',            taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'opieka nad zwierzętami', taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'plotkowanie',            taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'pływanie',               taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'powożenie',              taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'przekonywanie',          taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'przeszukiwanie',         taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'skradanie się',          taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'spostrzegawczość',       taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'sztuka przetrwania',     taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'targowanie',             taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'ukrywanie się',          taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'wioślarstwo',            taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'wspinaczka',             taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'wycena',                 taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
    { name: 'zastraszanie',           taken: '', isTen: '', isTwelve: '', relatedTalents: '' },
  ];
  advancedSkills = [];
  constructor( private characterService: CharacterService, private careerService: CareerService) { }

  ngOnInit() {
    this.characterService.getRaceSkill().subscribe( skills => {
      this.addSkill(skills);
    });
    this.careerService.getSkills().subscribe( skills => {
      this.addSkill(skills);
    });
    this.careerService.getChosenSkills().subscribe( skills => {
      this.addSkill(skills);
    });
  }
  addSkill(skills: string[]): void {
    skills.forEach( skill => {
      if (skill.search(' lub ') === -1) {
        let add = '';
        if (skill.search('wiedza') !== -1) {
          add = skill.slice(6, skill.length);
          skill = skill.slice(0, 6);
        } else if (skill.search('nauka') !== -1) {
          add = skill.slice(5, skill.length);
          skill = skill.slice(0, 5);
        } else if (skill.search('znajomość języka') !== -1) {
          add = skill.slice(16, skill.length);
          skill = skill.slice(0, 16);
        } else if (skill.search('rzemiosło') !== -1) {
          add = skill.slice(9, skill.length);
          skill = skill.slice(0, 9);
        }
      this.characterService.fetchSkillsInfo(skill).subscribe((ski: Skill) => {
        if (ski.skillType === 'basic') {
          this.basicSkills.forEach(basic => {
            if (basic.name === ski.name) {
              if (basic.taken === 'V') {
                if (basic.isTen === 'V') {
                  basic.isTwelve = 'V';
                } else {
                  basic.isTen = 'V';
                }
              } else {
                basic.taken = 'V';
              }
            }
          });
        } else {
          let found = false;
          this.advancedSkills.forEach(advanced => {
            if (advanced.name === ski.name + add) {
              found = true;
              if (advanced.isTen === 'V') {
                advanced.isTwelve = 'V';
              } else {
                advanced.isTen = 'V';
              }
            }
          });
          if (found === false) {
            this.advancedSkills.push({name: ski.name + add, isTaken: 'V', isTen: '', isTwelve: '', relatedTalents: ski.relatedTalents});
          }
        }
      });
      }
    });
  }
}
