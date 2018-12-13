import { Component, OnInit } from '@angular/core';
import { CareerService } from '../../../../services/career.service';
import { CharacterService } from '../../../../services/character.service';
import { Talent } from '../../../../interfaces/talent';

@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrls: ['./talents.component.scss']
})
export class TalentsComponent implements OnInit {
  talents: string[] = [];
  describe: string[] = [];
  constructor(private careerService: CareerService, private characterService: CharacterService ) {}

  ngOnInit() {
    this.characterService.getRaceTalents().subscribe( talents => {
      this.addTalents(talents);
    });
    this.careerService.getTalents().subscribe( talents => {
      this.addTalents(talents);
    });
    this.careerService.getChosenTalents().subscribe( talents => {
      this.addTalents(talents);
    });
  }
  addTalents(talents: any[]): void {
    talents.forEach(talent => {
      if (talent.search(' lub ') === -1) {
        if (this.talents.indexOf(talent) === -1) {
          let add = '';
          if (talent.search('broń specjalna') !== -1) {
            add = talent.slice(14, talent.length);
            talent = talent.slice(0, 14);
          }
          this.characterService.fetchTalentsInfo(talent).subscribe((tal: Talent) => {
            if (tal) {
              this.talents.push(tal.name + add);
              this.describe.push(tal.description);
              if (tal.influences !== []) {
                this.careerService.talentsInfluences(tal.influences);
              }
            }
          });
        }
      }
    });
  }
}
