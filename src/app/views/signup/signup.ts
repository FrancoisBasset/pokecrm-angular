import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import md5 from 'md5';

@Component({
	selector: 'SignUpView',
	imports: [ReactiveFormsModule],
	templateUrl: './signup.html'
})
export default class SignUpView {
	signupForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		firstname: new FormControl('', Validators.required),
		lastname: new FormControl('', Validators.required)
	});
	message: string | null = null;

	signup() {
		fetch('https://127.0.0.1:8000/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.signupForm.value.username,
				password: md5(this.signupForm.value.password as string),
				firstname: this.signupForm.value.firstname,
				lastname: this.signupForm.value.lastname
			})
		})
			.then(res => res.json())
			.then(json => {
				this.message = json.message;
				this.signupForm.reset();
			});
	}
}
