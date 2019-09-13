import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit {

  option = <number> 1;

  constructor() {}

  ngOnInit() {}

  chooseOption(option: number): void {
    this.option = option;
  }

}
