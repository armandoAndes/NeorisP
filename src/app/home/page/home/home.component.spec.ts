import { CommonEnums } from './../../enums/commons.enum';
import { GetPokemonsMock } from './../../../shared/mocks/get-pokemons.mock';
import { HttpNeorisService } from './../../service/http-neoris.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { FilterListPipe } from '../../pipe/filter-list.pipe';
import { lastValueFrom, of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pokemon } from '../../interface/pokemon.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { EventEmitter } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const childComponent = jasmine.createSpyObj('ModalComponent', [
    'ModalComponent',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, FilterListPipe],
      providers: [HttpNeorisService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Get Pokemons from API', async () => {
    spyOn(component, 'getPokemons').and.resolveTo(GetPokemonsMock);
    const getPokemons = await component.getPokemons();
    expect(getPokemons.length).toBeGreaterThan(0);
  });
  it('Delete Pokemon from list by Author', async () => {
    spyOn(component.httpNeoris, 'deletePokemon').and.returnValue(of({}));
    const spyGetPokemons = spyOn(component, 'getPokemons').and.resolveTo(
      GetPokemonsMock
    );
    await component.deletePokemon('35');
    expect(spyGetPokemons).toHaveBeenCalled();
  });
  it('Delete Pokemon from list by Author catch', async () => {
    const spyGetPokemons = spyOn(
      component.httpNeoris,
      'deletePokemon'
    ).and.throwError('message');
    await component.deletePokemon('35');
    expect(spyGetPokemons).toHaveBeenCalled();
  });
  it('Change state test', () => {
    component.stateNew = true;
    component.changeState();
    expect(component.stateNew).toBeFalse();
  });
  it('ngOnInit test', async () => {
    const spyGetPokemons = spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getPokemons').and.resolveTo(GetPokemonsMock);
    await component.ngOnInit();
    expect(spyGetPokemons).toHaveBeenCalled();
    expect(component.listPokemon.length).toBeGreaterThan(0);
  });
  it('ngOnInit test catch', async () => {
    const spyGetPokemons = spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getPokemons').and.throwError('error');
    await component.ngOnInit();
    expect(spyGetPokemons).toHaveBeenCalled();
    expect(component.listPokemon.length).toEqual(0);
  });
  it('getPokemonById test', async () => {
    spyOn<any>(component.httpNeoris, 'getPokemonsById').and.returnValue(
      of(GetPokemonsMock[0])
    );
    const resGetPokemon = await component.getPokemonById('35');
    expect(resGetPokemon).toEqual(GetPokemonsMock[0]);
  });
  it('rest test for init values', () => {
    component.reset();
    expect(component.attack).toEqual('50');
    expect(component.defense).toEqual('50');
    expect(component.createForm.get('name')?.value).toEqual('');
    expect(component.createForm.get('image')?.value).toEqual('');
  });
  it('closeModal state test', () => {
    component.statePopUp = true;
    component.closeModal();
    expect(component.statePopUp).toBeFalse();
  });
  it('createPokemon test for new Pokemon', async () => {
    component.attack = '50';
    component.defense = '50';
    component.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
    component.createForm.get('name')?.setValue(GetPokemonsMock[0].name);
    component.createForm.get('image')?.setValue(GetPokemonsMock[0].image);
    const spyHttp = spyOn(
      component.httpNeoris,
      'createPokemon'
    ).and.returnValue(of(GetPokemonsMock[0]));
    const spyGetPokemons = spyOn(component, 'getPokemons').and.resolveTo(
      GetPokemonsMock
    );
    await component.createPokemon();
    expect(spyHttp).toHaveBeenCalled();
    expect(spyGetPokemons).toHaveBeenCalled();
  });
  it('createPokemon test for new Pokemon catch', async () => {
    component.attack = '50';
    component.defense = '50';
    component.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
    component.createForm.get('name')?.setValue(GetPokemonsMock[0].name);
    component.createForm.get('image')?.setValue(GetPokemonsMock[0].image);
    const spyHttp = spyOn(component.httpNeoris, 'createPokemon').and.throwError(
      'error'
    );
    const spyGetPokemons = spyOn(component, 'getPokemons').and.resolveTo(
      GetPokemonsMock
    );
    await component.createPokemon();
    expect(spyHttp).toHaveBeenCalled();
  });
  it('updatePokemon test for mock', async () => {
    const spyHttpUpdate = spyOn(
      component.httpNeoris,
      'updatePokemon'
    ).and.returnValue(of(GetPokemonsMock[0]));
    const resUodate = await component.updatePokemon(GetPokemonsMock[0]);
    expect(spyHttpUpdate).toHaveBeenCalled();
    expect(resUodate).toEqual(GetPokemonsMock[0]);
  });

  it('', () => {});
});
