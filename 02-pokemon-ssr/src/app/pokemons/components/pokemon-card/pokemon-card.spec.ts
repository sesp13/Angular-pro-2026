import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'Bulbasur',
};

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;
    // Input values
    fixture.componentRef.setInput('pokemon', mockPokemon);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should compute correct pokemon image URL', () => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonImage()).toBe(url);
  });

  it('should render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(url);
    expect(imgElement?.alt).toBe(mockPokemon.name);
  });

  it('should have the correct route link configuration', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);

    const expectedUrl = `/pokemon/${mockPokemon.name}`;
    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
  });
});
