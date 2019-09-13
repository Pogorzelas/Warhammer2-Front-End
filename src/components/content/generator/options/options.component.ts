import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { CareerService } from '../../../../services/career.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  style = <string> 'main';
  phase = <number> 1;

  constructor(private characterService: CharacterService, private careerService: CareerService) {}

  ngOnInit() {
    this.characterService.getConfirmationP1().subscribe( confirmation => {
      if ( confirmation ) {
        this.phase = 2;
      }
    });
    this.characterService.getConfirmationP2().subscribe( confirmation => {
      if ( confirmation ) {
        this.phase = 3;
      }
    });
    this.characterService.getConfirmationP3().subscribe( confirmation => {
      if ( confirmation ) {
        this.phase = 4;
      }
    });
    this.careerService.getEnd().subscribe( end => {
      this.style = end;
      if ( end === '' ) {
        this.phase = 5;
      }
    });
  }

}


