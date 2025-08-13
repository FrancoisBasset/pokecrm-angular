import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import md5 from 'md5';

@Component({
	selector: 'SignInView',
	imports: [ReactiveFormsModule],
	templateUrl: './signin.html'
})
export default class SignInView {
	signinForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});
	message = signal('');

	signin() {
		fetch('https://127.0.0.1:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.signinForm.value.username,
				password: md5(this.signinForm.value.password as string)
			})
		}).then(res => {
			res.json().then(json => {
				if (res.status === 200) {
					localStorage.setItem('token', json.token);
					this.message.set('');
					window.location.href = '/monprofil';
				} else {
					this.message.set(json.message);
				}
			});
		});
	}
}
