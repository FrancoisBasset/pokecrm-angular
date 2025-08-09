import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MenuBar from './components/menubar/menubar';

@Component({
	selector: 'app-root',
	imports: [MenuBar, RouterOutlet],
	template: `
		<MenuBar />
		<router-outlet />
	`,
	styles: `
		:host {
			background-image: url('/pokeball.png');
			background-repeat: repeat;
			background-color: lightblue;
		}
	`
})
export class App {
	protected readonly title = signal('pokecrm-angular');
}
