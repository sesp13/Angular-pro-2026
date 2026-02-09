import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure correct functionality
    httpMock.verify();
  });

  it('should be created', () => {
    // expect(true).toBeFalsy();
    expect(service).toBeTruthy();
  });

  it('should load a page of pokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load page 5 of pokemons', () => {
    // First service call
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });
    // Second expect url call
    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=80',
    );
    // Mock response
    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon(mockPokemon.id).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${mockPokemon.id}`,
    );
    // Mock response
    req.flush(mockPokemon);
  });

  it('should load a pokemon by Name', () => {
    service.loadPokemon(mockPokemon.name).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${mockPokemon.name}`,
    );
    // Mock response
    req.flush(mockPokemon);
  });

  it('should catch error if API fails', () => {
    const payload = '@123948';

    service.loadPokemon(payload).subscribe({
      error: (err) => {
        console.log(err);
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${payload}`,
    );

    req.flush('Error', { status: 404, statusText: 'Error on request' });
  });
});
