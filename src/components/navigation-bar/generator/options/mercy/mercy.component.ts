import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';

@Component({
  selector: 'app-mercy',
  templateUrl: './mercy.component.html',
  styleUrls: ['./mercy.component.css']
})
export class MercyComponent implements OnInit {

  constructor(public characterService: CharacterService) { }

  ngOnInit() {
  }
  mercy(): void {
    this.characterService.setMercy();
  }
}
