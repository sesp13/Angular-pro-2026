import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage { }
