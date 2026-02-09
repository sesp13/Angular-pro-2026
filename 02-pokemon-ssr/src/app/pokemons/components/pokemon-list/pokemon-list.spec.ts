import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonList } from './pokemon-list';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'Bulbasur',
  },
  {
    id: '2',
    name: 'Pikachu',
  },
];

describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemons', mockPokemons);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-pokemon-card').length).toBe(
      mockPokemons.length,
    );
  });

  it('should render No hay pokemones when list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('div.col-span-5');
    expect(message?.textContent).toContain('No hay pokemones');
  });
});
