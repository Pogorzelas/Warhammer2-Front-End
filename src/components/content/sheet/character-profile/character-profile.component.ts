import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { CareerService } from '../../../../services/career.service';
import {Race} from '../../../../interfaces/race';
import {StaticMethods} from '../../../../constants/static-methods';

@Component({
  selector: 'app-character-profile',
  templateUrl: './character-profile.component.html',
  styleUrls: ['./character-profile.component.scss']
})
export class CharacterProfileComponent implements OnInit {

  // PHASE #1
  race: string;
  mainProfile = new Array<number>(8);
  secondaryProfile = new Array<number>(8);
  // PHASE #2
  mainProfileDifference = new Array<number>(8) ;
  mercy: string[] = ['', '', '', '', '', '', '', ''];
  isDisabled: boolean[] = [true, true, true, true, true, true, true, true];
  // PHASE #4
  advanceMainProfile = new Array<number>(8);
  advanceSecondaryProfile = new Array<any>(8);

  constructor(private characterService: CharacterService, private careerService: CareerService) {}

  ngOnInit() {
    // PHASE #1
    this.characterService.getRace().subscribe(race => {
      this.race = race;
    });
    this.characterService.getConfirmationP1().subscribe( confirmation => {
      if (confirmation === true) {
        this.getRace(this.race);
      }
    });
    // PHASE #3
    this.characterService.getMercy().subscribe( mercy => {
      for ( let i = 0; i < 8; i++ ) {
        if ( this.mainProfileDifference[i] < 11 ) {
          this.isDisabled[i] = mercy;
          this.mercy[i] = 'mercy';
        }
      }
      if ( this.mainProfileDifference.findIndex(x => x < 11) === -1) {
        this.characterService.disableMercy();
      } // do naprawy znów
    });
    // PHASE #4
    this.careerService.getCareerMainProfile().subscribe( main => {
      this.advanceMainProfile = main;
      this.checkSecondary(this.mainProfile[2] + main[2], this.mainProfile[3] + main[3]);
    });
    this.careerService.getCareerSecondaryProfile().subscribe( secondary => {
      this.advanceSecondaryProfile = secondary;
      this.characterService.setSpeed(this.secondaryProfile + secondary[4]);
    });
    this.careerService.getTalentsInfluences().subscribe( influences => {
      if (influences[0] === 'main') {
        this.mainProfile[influences[1]] += 5;
        if (this.advanceMainProfile[2] === undefined) {
          this.checkSecondary(this.mainProfile[2], this.mainProfile[3]);
        } else {
          this.checkSecondary(this.mainProfile[2] + this.advanceMainProfile[2], this.mainProfile[3] + this.advanceMainProfile[3]);
        }
      } else {
        this.secondaryProfile[influences[1]] += 1;
        if (this.advanceSecondaryProfile[4] === undefined) {
          this.characterService.setSpeed(this.secondaryProfile[4]);
        } else {
          this.characterService.setSpeed(this.secondaryProfile[4] + this.advanceSecondaryProfile[4]);
        }
      }
    });
  }
  // PHASE #1
  getRace(race: string): void {
    this.characterService.fetchProfileInfo(race).subscribe( (rac: Race) => {
      // *PROFILES Table 2-1
      this.mainProfile = rac.mainProfile;
      this.secondaryProfile = rac.secondaryProfile;
      this.mainProfile.forEach( (main, i) => {
       // **GET DIFFERENCE TO MERCY
       this.mainProfileDifference[i] = main;
       this.mainProfile[i] += StaticMethods.rollK10() + StaticMethods.rollK10();
       this.mainProfileDifference[i] = this.mainProfile[i] - this.mainProfileDifference[i];
      });
      // *ROLL WOUNDS & FATE POINTS
      const rollW = StaticMethods.rollK10();
      const rollFP = StaticMethods.rollK10();
      this.secondaryProfile[1] = rac.startingWounds[rollW < 4 ? 0 : rollW < 7 ? 1 : rollW < 10 ? 2 : 3]; // TABLE 2-2
      this.secondaryProfile[7] = rac.startingFatePoints[rollFP < 5 ? 0 : rollFP < 8 ? 1 : 2];            // TABLE 2-3
      this.checkSecondary(this.mainProfile[2], this.mainProfile[3]);
    });
  }
  // PHASE #2
  change(num: number): void {
    if (!this.isDisabled[num]) {
      this.mainProfile[num] += 11 - this.mainProfileDifference[num];
      if (num === 2 || num === 3) {
        this.checkSecondary(this.mainProfile[2], this.mainProfile[3]);
      }
      this.isDisabled = this.isDisabled.fill( true);
      this.characterService.disableMercy();
      this.mercy.fill( '');
    }
  }
  // SET UP STRENGTH & TOUGHNESS
  checkSecondary(sb: number, tb: number): void {
    this.secondaryProfile[2] = Math.floor(sb / 10);
    this.secondaryProfile[3] = Math.floor(tb / 10);
  }

}

