import { CommonEnums } from './../../enums/commons.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/* Interface */
import { ButtonComponentInterface } from '../../interface/button.interface';
import { Pokemon } from '../../interface/pokemon.interface';
/* Labels */
import { HomeLabels } from '../../labels/home.labels';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() sendUpdate = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() public propertiesModal!: Pokemon;
  public labels = HomeLabels;
  public defense: string = '50';
  public attack: string = '50';
  public saveButton: ButtonComponentInterface = {
    color: CommonEnums.color,
    icon: CommonEnums.saveIcon,
    label: HomeLabels.saveButtonLabel,
    disabled: false,
  };
  public cancelButton: ButtonComponentInterface = {
    color: CommonEnums.color,
    icon: CommonEnums.closeIcon,
    label: HomeLabels.cancelButtonLabel,
    disabled: false,
  };
  public updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  constructor() {}

  public ngOnInit(): void {
    this.updateForm.get('name')?.setValue(this.propertiesModal.name);
    this.updateForm.get('image')?.setValue(this.propertiesModal.image);
    this.attack = this.propertiesModal.attack.toString();
    this.defense = this.propertiesModal.defense.toString();
  }

  public emitClose(): void {
    let pokemon: Pokemon = {
      attack: Number(this.attack),
      defense: Number(this.defense),
      hp: 100,
      image: this.updateForm.get('image')?.value,
      name: this.updateForm.get('name')?.value,
      type: this.propertiesModal.type,
      idAuthor: this.propertiesModal.idAuthor,
      id: this.propertiesModal.id,
    };
    this.sendUpdate.emit(pokemon);
  }
  public cancelUpdate(): void {
    this.cancel.emit();
  }
}
