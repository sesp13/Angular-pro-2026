import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-skeleton',
  imports: [],
  templateUrl: './pokemon-list-skeleton.html',
  styleUrl: './pokemon-list-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeleton { }
