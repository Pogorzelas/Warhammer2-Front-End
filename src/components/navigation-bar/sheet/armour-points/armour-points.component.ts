import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../services/career.service';
import {Armour} from '../../../../interfaces/armour';

@Component({
  selector: 'app-armour-points',
  templateUrl: './armour-points.component.html',
  styleUrls: ['./armour-points.component.scss']
})
export class ArmourPointsComponent implements OnInit {
  armourPoints = new Array<number>(6);
  constructor(private careerService: CareerService) { }

  ngOnInit() {
    this.careerService.getArmourPoints().subscribe( points => {
      this.armourPoints.fill(points);
    });
    this.careerService.getArmour().subscribe( (armour: Armour) => {
        if (armour.locationsCovered.search('głowa') !== -1) {
          this.armourPoints[0] = armour.AP;
        }
        if (armour.locationsCovered.search('korpus') !== -1) {
          this.armourPoints[1] = armour.AP;
        }
        if (armour.locationsCovered.search('ręce') !== -1) {
          this.armourPoints[2] = armour.AP;
          this.armourPoints[3] = armour.AP;
        }
        if (armour.locationsCovered.search('nogi') !== -1) {
          this.armourPoints[4] = armour.AP;
          this.armourPoints[5] = armour.AP;
        }
        if (armour.locationsCovered.search('wszystkie') !== -1) {
          this.armourPoints.fill(armour.AP);
        }
    });
  }

}
