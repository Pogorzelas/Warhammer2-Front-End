import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../../services/character.service';

@Component({
  selector: 'app-choose-name',
  templateUrl: './choose-name.component.html',
  styleUrls: ['./choose-name.component.scss']
})
export class ChooseNameComponent implements OnInit {
  name: string;
  tableName: string[];
  hide = true;
  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getTableName().subscribe( table => {
      this.tableName = table;
    });
  }
  chooseName(): void {
    !this.name ? this.hide = false : this.characterService.confirmName();
  }
  choose(num: number) {
    this.name = this.tableName[num]; // pomysleć
    this.characterService.setName(this.tableName[num]);
  }
}
