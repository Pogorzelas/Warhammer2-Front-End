import { Component, OnInit } from '@angular/core';
import {CareerService} from '../../../services/career.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  phase = 'start';

  constructor(private careerService: CareerService) {}

  ngOnInit() {
    this.careerService.getFinish().subscribe( finish => {
      this.phase = finish;
    });
  }

}
