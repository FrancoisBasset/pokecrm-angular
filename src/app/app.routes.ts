import { Routes } from '@angular/router';
import SignUpView from './views/signup/signup';
import SignInView from './views/signin/signin';
import PokemonListView from './views/pokemonlist/pokemonlist';

export const routes: Routes = [
	{
		path: 'inscription',
		component: SignUpView
	},
	{
		path: 'connexion',
		component: SignInView
	},
	{
		path: 'touslespokemon',
		component: PokemonListView
	}
];
