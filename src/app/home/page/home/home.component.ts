import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
/* Interface */
import { Pokemon } from '../../interface/pokemon.interface';
import { InputComponentInterface } from '../../interface/input.interface';
import { ButtonComponentInterface } from '../../interface/button.interface';
/* Labels */
import { HomeLabels } from '../../labels/home.labels';
/* Service */
import { HttpNeorisService } from './../../service/http-neoris.service';
/* Components */
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonEnums } from '../../enums/commons.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ModalComponent, { read: ModalComponent, static: false })
  public modal!: ModalComponent;
  public listPokemon: Pokemon[];
  public labels = HomeLabels;
  public defense: string = '50';
  public attack: string = '50';
  public stateNew = true;
  public searchPokemon = '';
  public inputSearch: InputComponentInterface;
  public statePopUp = false;
  public newButton: ButtonComponentInterface = {
    color: CommonEnums.color,
    icon: CommonEnums.addIcon,
    label: this.labels.newButtonLabel,
    disabled: false,
  };
  public pokemonInit: Pokemon = {
    attack: 0,
    defense: 0,
    hp: 100,
    image: '',
    name: '',
    type: '',
    idAuthor: 1,
  };
  public cancelButton: ButtonComponentInterface = {
    color: CommonEnums.color,
    icon: CommonEnums.closeIcon,
    label: this.labels.cancelButtonLabel,
    disabled: false,
  };

  public createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  public saveButton: ButtonComponentInterface = {
    color: CommonEnums.color,
    icon: CommonEnums.saveIcon,
    label: this.labels.saveButtonLabel,
    disabled: false,
  };
  constructor(public httpNeoris: HttpNeorisService) {
    this.listPokemon = [];
    this.inputSearch = {
      icon: false,
      placeholder: this.labels.searchButtonLabel,
      type: CommonEnums.typeText,
    };
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.listPokemon = await this.getPokemons();
    } catch (error) {
      alert(error);
    }
  }
  public async getPokemons(): Promise<Pokemon[]> {
    return await lastValueFrom(this.httpNeoris.getPokemonsByAuthor('1'));
  }
  public async getPokemonById(idPokemon: string): Promise<Object> {
    return await lastValueFrom(this.httpNeoris.getPokemonsById(idPokemon));
  }
  public async createPokemon(): Promise<void> {
    try {
      let pokemon: Pokemon = {
        attack: Number(this.attack),
        defense: Number(this.defense),
        hp: 100,
        image: this.createForm.get('image')?.value,
        name: this.createForm.get('name')?.value,
        type: CommonEnums.defaultType,
        idAuthor: 1,
      };
      await lastValueFrom(this.httpNeoris.createPokemon(pokemon));
      this.listPokemon = await this.getPokemons();
      this.reset();
    } catch (error) {
      alert(error);
    }
  }
  public async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return await lastValueFrom(this.httpNeoris.updatePokemon(pokemon));
  }
  public async deletePokemon(idPokemon: string): Promise<void> {
    try {
      await lastValueFrom(this.httpNeoris.deletePokemon(idPokemon));
      this.listPokemon = await this.getPokemons();
    } catch (error) {
      alert(error);
    }
  }
  public changeState(): void {
    this.stateNew = !this.stateNew;
  }
  public closeModal(): void {
    this.statePopUp = !this.statePopUp;
  }
  public async editState(pokemon: Pokemon): Promise<void> {
    this.statePopUp = !this.statePopUp;
    this.modal.propertiesModal = {
      attack: pokemon.attack,
      defense: pokemon.defense,
      hp: pokemon.hp,
      image: pokemon.image,
      name: pokemon.name,
      type: pokemon.type,
      id: pokemon.id,
      idAuthor: pokemon.idAuthor,
    };
    this.modal.updateForm.get('name')?.setValue(pokemon.name);
    this.modal.updateForm.get('image')?.setValue(pokemon.image);
    this.modal.attack = pokemon.attack.toString();
    this.modal.defense = pokemon.defense.toString();

    try {
      await this.updatePokemon(pokemon);
      this.listPokemon = await this.getPokemons();
    } catch (error) {
      alert(error);
    }
  }
  public reset(): void {
    this.attack = '50';
    this.defense = '50';
    this.createForm.get('name')?.setValue('');
    this.createForm.get('image')?.setValue('');
  }
}
