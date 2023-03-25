import { Component, Input, OnInit } from '@angular/core';
import { InputComponentInterface } from '../../interface/input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() public propertiesInput!: InputComponentInterface;
  constructor() {}

  public ngOnInit(): void {}
}
