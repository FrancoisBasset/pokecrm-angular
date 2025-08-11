import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MenuBar from './components/menubar/menubar';

@Component({
	selector: 'app-root',
	imports: [MenuBar, RouterOutlet],
	template: `
		<MenuBar />
		<router-outlet />
	`
})
export class App {
	protected readonly title = signal('pokecrm-angular');
}
