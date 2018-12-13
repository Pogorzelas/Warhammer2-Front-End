import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../services/career.service';
import {Armour} from '../../../../interfaces/armour';

@Component({
  selector: 'app-armour',
  templateUrl: './armour.component.html',
  styleUrls: ['./armour.component.scss']
})
export class ArmourComponent implements OnInit {
  armourType: string;
  armourPoints: number;
  armour: Armour[] = [];
  constructor(private careerService: CareerService) { }

  ngOnInit() {
      this.careerService.getArmourPoints().subscribe( armourPoints => {
        this.armourPoints = armourPoints;
      });
      this.careerService.getArmourType().subscribe( armourType => {
        this.armourType = armourType;
      });
      this.careerService.getArmour().subscribe( armour => {
        this.armour.push(armour);
      });
      }
}
