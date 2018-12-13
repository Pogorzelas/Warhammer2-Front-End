import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../services/career.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {
  goldCrowns = Math.floor(Math.random() * 19) + 2;
  constructor(private careerService: CareerService) { }

  ngOnInit() {
    this.careerService.getMoney().subscribe( money => {
      this.goldCrowns += money;
    });
  }

}
