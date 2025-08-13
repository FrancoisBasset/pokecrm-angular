import { Component, computed, output } from "@angular/core";
import Pokemon from "../../classes/pokemon";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'FindPokemonForm',
    imports: [FormsModule],
    templateUrl: './findpokemonform.html'
})
export default class FindPokemonForm {
    protected pokedex_id: string = '';
	protected salt: string = '';
    onCheckSaltResult = output<Pokemon>();

	buttonIsDisabled() {
		return this.pokedex_id.trim() === '' || this.salt.trim() === '';
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
                    this.pokedex_id = '';
					this.salt = '';
                    this.onCheckSaltResult.emit(json.pokemon);
                } else {
                    alert(json.message);
                }
			});
		});
	}
}