import { Component, computed, input } from '@angular/core';
import Pokemon from '../../classes/pokemon';

@Component({
	selector: 'PokemonBlock',
	templateUrl: './pokemonblock.html'
})
export default class PokemonBlock {
	pokemon = input<Pokemon>();

	englishName = computed<string | undefined>(() => this.pokemon()?.englishName.toLowerCase().replace('♂', 'm'));

	getFrontGif() {
		return 'https://play.pokemonshowdown.com/sprites/ani/' + this.englishName() + '.gif'
	}

	getBackGif() {
		return 'https://play.pokemonshowdown.com/sprites/ani-back/' + this.englishName() + '.gif'
	}
}
