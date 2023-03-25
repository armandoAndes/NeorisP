import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ButtonComponentInterface } from '../../interface/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() public propertiesButton!: ButtonComponentInterface;
  @Output() sendClick = new EventEmitter();
  constructor() {}

  public ngOnInit(): void {}
  public getIcon(): Object {
    return { 'background-image': `url(${this.propertiesButton.icon})` };
  }
  public sendEvent(): void {
    this.sendClick.emit();
  }
}
