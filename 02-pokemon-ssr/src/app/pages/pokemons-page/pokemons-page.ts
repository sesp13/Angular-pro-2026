import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {
  public pokemons = signal<SimplePokemon[]>([]);
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPageChange = effect(() => {
    const pageToLoad = this.currentPage();
    this.loadPokemons(pageToLoad);
  });

  public loadPokemons(page = 0) {
    this.pokemonService
      .loadPage(page)
      .pipe(
        tap(() => {
          this.title.setTitle(`Pokemons SSR - Page ${page}`);
        }),
      )
      .subscribe((pokemons) => {
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
