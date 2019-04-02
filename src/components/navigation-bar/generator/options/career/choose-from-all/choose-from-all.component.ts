import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../../services/character.service';
import {CareerService} from '../../../../../../services/career.service';

@Component({
  selector: 'app-choose-from-all',
  templateUrl: './choose-from-all.component.html',
  styleUrls: ['./choose-from-all.component.scss']
})
export class ChooseFromAllComponent implements OnInit {

  race: string;
  careerId: string;
  tableCareer = [];
  tableId = [];

  constructor(private characterService: CharacterService, private careerService: CareerService) {}

  ngOnInit() {
    this.characterService.getRace().subscribe( rac => {
      this.race = rac;
    });
    this.careerService.getCareerAllIdTable().subscribe( table => {
      this.tableId = table;
    });
    this.careerService.getCareerAllNamesTable().subscribe( table => {
      this.tableCareer = table;
      for ( let i = 0; i < table.length; i++) {
        if ( this.race !== 'Krasnolud' && table[i] === 'Goniec' ) {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( this.race !== 'Krasnolud' && table[i] === 'Tarczownik' ) {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( this.race !== 'Krasnolud' && table[i] === 'Zabójca trolli' ) {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( this.race !== 'Elf' && table[i] === 'Rzecznik rodu' ) {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( this.race !== 'Elf' && table[i] === 'Wojownik klanowy' ) {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( this.race !== 'Niziołek' && table[i] === 'Strażnik pól' ) {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( (this.race === 'Krasnolud' || this.race === 'Niziołek') && table[i] === 'Guślarz') {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
        if ( (this.race === 'Krasnolud' || this.race === 'Niziołek') && table[i] === 'Uczeń czarodzieja') {
          this.tableCareer.splice(i, 1);
          this.tableId.splice(i, 1);
        }
      }
    });
  }

  chooseCareer(): void {
    this.careerService.addCareer(this.careerId);
  }

  choose(num: number) {
    this.careerId = this.tableId[num];
  }

}
