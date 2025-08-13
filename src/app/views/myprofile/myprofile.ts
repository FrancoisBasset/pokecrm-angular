import { Component, signal } from '@angular/core';
import Pokemon from '../../classes/pokemon';
import PokemonBlock from '../../components/pokemonblock/pokemonblock';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'MyProfileView',
	imports: [FormsModule, PokemonBlock],
	templateUrl: './myprofile.html'
})
export default class MyProfileView {
	pokedex_id: string = '';
	salt: string = '';
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

	checkSalt() {
		fetch('https://127.0.0.1:8000/checksalt', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify({
				pokedex_id: this.pokedex_id,
				salt: this.salt
			})
		}).then(res => {
			res.json().then(json => {
				if (json.pokemon) {
					if (this.mypokemon().some(p => p.id === json.pokemon.id)) {
						alert('Ce Pokémon est déjà présent !');
						return;
					}

					this.newPokemon.set(json.pokemon);
					this.mypokemon.update(values => [...values, json.pokemon].sort((a, b) => a.id - b.id));

					this.pokedex_id = '';
					this.salt = '';
				} else {
					alert(json.message);
				}
			});
		});
	}
}
