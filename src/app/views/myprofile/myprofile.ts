import { Component, signal } from '@angular/core';
import Pokemon from '../../classes/pokemon';
import PokemonBlock from '../../components/pokemonblock/pokemonblock';
import FindPokemonForm from '../../components/findpokemonform/findpokemonform';

@Component({
	selector: 'MyProfileView',
	imports: [FindPokemonForm, PokemonBlock],
	templateUrl: './myprofile.html'
})
export default class MyProfileView {
	protected mypokemon = signal<Pokemon[]>([]);
	protected newPokemon = signal<Pokemon | null>(null);

	ngOnInit() {
		fetch('https://127.0.0.1:8000/mypokemon', {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		})
			.then(res => res.json())
			.then(json => {
				this.mypokemon.set(json);
			});
	}

	onCheckSaltResult(pokemon: Pokemon) {
		if (this.mypokemon().some(p => p.id === pokemon.id)) {
			alert('Ce Pokémon est déjà présent !');
			return;
		}

		this.newPokemon.set(pokemon);
		this.mypokemon.update(values => [...values, pokemon].sort((a, b) => a.id - b.id));
	}
}
