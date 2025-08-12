import { Component, signal } from '@angular/core';
import MovingPokemon from '../../classes/movingpokemon';
import Pokemon from '../../classes/pokemon';

@Component({
	selector: 'HomeView',
	templateUrl: './home.html'
})
export default class HomeView {
	protected movingPokemon = signal<MovingPokemon[]>([]);

	ngOnInit() {
		fetch('https://127.0.0.1:8000/randompokemon')
			.then(res => res.json())
			.then(json => {
				const allPokemon: Pokemon[] = json;

				for (const pokemon of allPokemon) {
					const movingPokemon: MovingPokemon = {
						sprite: pokemon.sprite,
						name: pokemon.name,
						...this.getRandomPosition()
					};
					this.movingPokemon.update(values => [...values, movingPokemon]);
				}

				setInterval(() => {
					this.updatePositions();
				}, 1200);
			});
	}

	getRandomPosition() {
		let x = Math.floor(Math.random() * window.innerWidth);
		if (x + 100 > window.innerWidth) {
			x -= 100;
		}

		let y = Math.floor(Math.random() * window.innerHeight);
		if (y + 100 > window.innerHeight) {
			y -= 100;
		}

		return { x, y };
	}

	updatePositions() {
		this.movingPokemon.update(list =>
			list.map(p => ({
				...p,
				...this.getRandomPosition()
			}))
		);
	}
}
