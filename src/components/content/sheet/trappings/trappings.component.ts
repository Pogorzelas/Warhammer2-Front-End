import {Component, OnInit} from '@angular/core';
import {CareerService} from '../../../../services/career.service';
import {Trapping} from '../../../../interfaces/trapping';
import {CharacterService} from '../../../../services/character.service';
@Component({
  selector: 'app-trappings',
  templateUrl: './trappings.component.html',
  styleUrls: ['./trappings.component.scss']
})
export class TrappingsComponent implements OnInit {

  trappings: Trapping[] = [];

  constructor(private characterService: CharacterService, private careerService: CareerService) {}

  ngOnInit() {
    this.characterService.getStartingTrappings().subscribe( trappings => {
      trappings.forEach( trapping  => {
        this.addTrapping(trapping);
      });
    });
    this.careerService.getTrappings().subscribe(trapping => {
      this.addTrapping(trapping);
    });
    this.careerService.getChosenTrappings().subscribe( trapping => {
      this.addTrapping(trapping);
    });
  }

  addTrapping(trapping: any): void {
    if (trapping.search(' lub ') === -1) {
      if (trapping.search('k10') !== -1) {
        const rolls = Number(trapping[trapping.indexOf('k10') - 1]);
        trapping = trapping.replace(rolls + 'k10', Math.floor(Math.random() * (rolls * 10 - rolls + 1)) + rolls + '');
        this.trappings.push({name: trapping, enc: 0, description: '-'});
      } else {
        this.careerService.fetchTrappingInfo(trapping).subscribe((trap: Trapping) => {
          if (trap) {
            this.trappings.push(trap);
          } else {
            this.trappings.push({name: trapping, enc: 0, description: '-'});
          }
        });
      }
    }
  }

}
