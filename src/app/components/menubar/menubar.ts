import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'MenuBar',
	imports: [RouterLink],
	templateUrl: './menubar.html'
})
export default class MenuBar {
	isConnected = signal<boolean>(localStorage.getItem('token') != null);
	private router = inject(Router);

	logout() {
		fetch('https://127.0.0.1:8000/logout', {
			method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                localStorage.removeItem('token');
				this.router.navigate(['/']);
				this.isConnected.set(false);
            })
	}
}
