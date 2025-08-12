import { Routes } from '@angular/router';
import SignUpView from './views/signup/signup';
import SignInView from './views/signin/signin';
import PokemonListView from './views/pokemonlist/pokemonlist';
import HomeView from './views/home/home';
import MyProfileView from './views/myprofile/myprofile';

export const routes: Routes = [
	{
		path: '',
		component: HomeView
	},
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
	},
	{
		path: 'monprofil',
		component: MyProfileView
	}
];
