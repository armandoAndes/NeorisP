import { GetPokemonsMock } from './../../shared/mocks/get-pokemons.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpNeorisService } from './http-neoris.service';
import { of, lastValueFrom } from 'rxjs';

describe('HttpNeorisService', () => {
  let service: HttpNeorisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpNeorisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getPokemonsByAuthor test', async () => {
    spyOn(service.http, 'get').and.returnValue(of(GetPokemonsMock));
    const res = service.getPokemonsByAuthor('1');
    expect(await lastValueFrom(res)).toEqual(GetPokemonsMock);
  });
  it('getPokemonsById test', async () => {
    spyOn(service.http, 'get').and.returnValue(of(GetPokemonsMock[0]));
    const res = service.getPokemonsById('1');
    expect(await lastValueFrom(res)).toEqual(GetPokemonsMock[0]);
  });
  it('createPokemon test', async () => {
    spyOn(service.http, 'post').and.returnValue(of(GetPokemonsMock[0]));
    const res = service.createPokemon(GetPokemonsMock[0]);
    expect(await lastValueFrom(res)).toEqual(GetPokemonsMock[0]);
  });
  it('updatePokemon test', async () => {
    spyOn(service.http, 'put').and.returnValue(of(GetPokemonsMock[0]));
    const res = service.updatePokemon(GetPokemonsMock[0]);
    expect(await lastValueFrom(res)).toEqual(GetPokemonsMock[0]);
  });
  it('dellete test', async () => {
    spyOn(service.http, 'delete').and.returnValue(of(GetPokemonsMock[0]));
    const res = service.deletePokemon('135');
    expect(await lastValueFrom(res)).toEqual(GetPokemonsMock[0]);
  });
});
