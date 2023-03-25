import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interface/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpNeorisService {
  constructor(public http: HttpClient) {}
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  public getPokemonsByAuthor(idAuthor: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(environment.httpUrls.getPokemons(idAuthor));
  }
  public getPokemonsById(idPokemon: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      environment.httpUrls.getPokemonById(idPokemon)
    );
  }
  public createPokemon(pokemon: Pokemon): Observable<Object> {
    return this.http.post<Object>(environment.httpUrls.createPokemon, pokemon, {
      headers: this.headers,
    });
  }
  public updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(
      environment.httpUrls.updatePokemonById(pokemon.id!.toString()),
      pokemon
    );
  }
  public deletePokemon(idPokemon: string): Observable<Object> {
    return this.http.delete<Object>(
      environment.httpUrls.deletePokemonById(idPokemon)
    );
  }
}
