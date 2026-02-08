import { Location } from '@angular/common';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import AboutPage from './pages/about-page/about-page';
import PricingPage from './pages/pricing-page/pricing-page';
import PokemonsPage from './pages/pokemons-page/pokemons-page';

describe('AppRoutes', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeTruthy();
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBeGreaterThanOrEqual(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about');
    expect(aboutRoute).toBeDefined();
    const component = await (aboutRoute as any).loadComponent();
    expect(component.default).toBe(AboutPage);
  });

  it('should navigate to "/about" as default path', async () => {
    await router.navigate(['/route-not-defined']);
    expect(location.path()).toBe('/about');
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    const pricingRoute = routes.find((route) => route.path === 'pricing');
    expect(pricingRoute).toBeDefined();
    const component = await (pricingRoute as any).loadComponent();
    expect(component.default).toBe(PricingPage);
  });

  it('should navigate to "/pokemons/page/1" and keep that path', async () => {
    await router.navigate(['/pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const pokemonPageRoute = routes.find(
      (route) => route.path === 'pokemons/page/:page',
    );
    expect(pokemonPageRoute).toBeDefined();
    const component = await (pokemonPageRoute as any).loadComponent();
    expect(component.default).toBe(PokemonsPage);
  });

  it('should redirect to /about when path is unknown', async () => {
    await router.navigate([]);
    expect(location.path()).toBe('/about');
  });
});
