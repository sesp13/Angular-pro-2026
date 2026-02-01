import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList {}
