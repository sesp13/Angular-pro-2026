import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    const pageLength = 20;

    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    return this.http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${pageLength}&offset=${page * pageLength}`,
      )
      .pipe(
        map((res) => {
          const simplePokemons: SimplePokemon[] = res.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            }),
          );
          return simplePokemons;
        }),
      );
  }
}
