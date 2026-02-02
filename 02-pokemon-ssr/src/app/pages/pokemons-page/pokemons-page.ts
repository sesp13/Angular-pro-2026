import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  public pokemons = signal<SimplePokemon[]>([]);

  private pokemonService = inject(PokemonsService);

  ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    this.pokemonService.loadPage(page).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }

  // Stable app references and other stuff

  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log(isStable);
  // });

  // ngOnInit(): void {
  // setTimeout(() => {
  //   this.isLoading.set(false);
  // }, 5000);
  // }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
