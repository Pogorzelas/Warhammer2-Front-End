import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../../../services/career.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  option: number;
  constructor(private careerService: CareerService) { }

  ngOnInit() {
    this.careerService.getAllCareers();
  }

  chooseOption(option: number): void {
    this.option = option;
    }
  }


