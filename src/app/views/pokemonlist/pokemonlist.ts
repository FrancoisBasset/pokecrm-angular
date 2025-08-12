import { Component, signal } from '@angular/core';
import Pokemon from '../../classes/pokemon';

@Component({
	selector: 'PokemonListView',
	templateUrl: './pokemonlist.html'
})
export default class PokemonListView {
	protected allPokemon = signal<Pokemon[]>([]);

	ngOnInit() {
		fetch('https://127.0.0.1:8000/allpokemon')
			.then(res => res.json())
			.then(json => {
				this.allPokemon.set(json);
			});
	}
}
