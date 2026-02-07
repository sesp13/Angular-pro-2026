import { Location } from '@angular/common';
import { routes } from './app.routes';
import { Router } from '@angular/router';

describe('AppRoutes', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {});

  it('should be defined', () => {
    expect(routes).toBeTruthy();
  });

  it('should contain all defined routes', () => {
    // todo:
  });

  it('should render AboutPageComponent when path is /about', async () => {
    // todo:
  });

  it('should navigate to "/about" and render AboutPageComponent', async () => {
    // todo:
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    // todo:
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    // todo:
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    // todo:
  });

  it('should redirect to /about when path is unknown', async () => {
    // todo:
  });
});
