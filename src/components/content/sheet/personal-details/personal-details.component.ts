import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {PersonalDetails} from '../../../../interfaces/personal-details';
import {StaticMethods} from '../../../../constants/static-methods';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  age: string;
  gender: string;
  eyeColour: string;
  weight: string;
  hairColour: string;
  height: string;
  starSign: string;
  numberOfSiblings: number;
  birthPlace: string;
  distinguishingMarks: string;
  race: string;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getRace().subscribe(race => {
      this.race = race;
    });
    this.characterService.getGender().subscribe(gender => {
      this.gender = gender;
    });
    this.characterService.getConfirmationP1().subscribe(confirmation => {
      if (confirmation === true) {
        this.getDetails(this.race);
      }
    });
  }
  // DETAILS
  getDetails(race: string): void {
    this.characterService.fetchProfileInfo(race).subscribe((personal: PersonalDetails) => {
      // *TABLE 2-6
      if (this.gender === 'kobieta') {
        this.height = personal.height[1] + StaticMethods.rollK10() + StaticMethods.rollK10() + ' cm';
      } else {
        this.height = personal.height[0] + StaticMethods.rollK10() + StaticMethods.rollK10() + ' cm';
      }
      // *TABLE 2-7
      this.weight = personal.weight[StaticMethods.rollWeight()] + ' kg';
      // *TABLE 2-8
      this.hairColour = personal.hairColour[StaticMethods.rollK10() - 1];
      // *TABLE 2-9
      this.eyeColour = personal.eyeColour[StaticMethods.rollK10() - 1];
      // *TABLE 2-10
      this.distinguishingMarks = StaticMethods.rollDistinguishingMarks();
      // *TABLE 2-11
      this.numberOfSiblings = personal.numberOfSiblings[StaticMethods.rollNumberOfSiblings()];
      // *TABLE 2-12
      this.starSign = StaticMethods.rollStarSign();
      // *TABLE 2-13
      this.age = StaticMethods.yearWord(personal.age[StaticMethods.rollK20() - 1]);
      // *ROLL BIRTHPLACE
      if (this.race === 'Człowiek') {
        // **TABLE 2-14
        this.birthPlace = StaticMethods.rollHumanBirthPlace();
      } else if (this.race === 'Krasnolud') {
        // **TABLE 2-15
        this.birthPlace = StaticMethods.rollDwarfBirthPlace();
      } else if (this.race === 'Elf') {
        // **TABLE 2-16
        this.birthPlace = StaticMethods.rollElfBirthPlace();
      } else {
        // **TABLE 2-17
        this.birthPlace = StaticMethods.rollHalflingBirthPlace();
      }
    });
  }

}
