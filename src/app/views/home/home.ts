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
		fetch('https://127.0.0.1:8000/pokemon')
			.then(res => res.json())
			.then(json => {
				const allPokemon: Pokemon[] = json;

				for (let i = 0; i < 20; i++) {
					const randomPokemon: Pokemon = allPokemon[Math.floor(Math.random() * allPokemon.length)];

					const { x, y } = this.getRandomPosition();

					const movingPokemon: MovingPokemon = {
						sprite: randomPokemon.sprite,
						name: randomPokemon.name,
						x: x,
						y: y
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
