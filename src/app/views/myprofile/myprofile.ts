import { Component, signal } from "@angular/core";
import Pokemon from "../../classes/pokemon";
import PokemonBlock from "../../components/pokemonblock/pokemonblock";

@Component({
    selector: 'MyProfileView',
    imports: [PokemonBlock],
    templateUrl: './myprofile.html'
})
export default class MyProfileView {
    protected mypokemon = signal<Pokemon[]>([]);

    ngOnInit() {
        fetch('https://127.0.0.1:8000/mypokemon', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(json => {
                this.mypokemon.set(json);
            })
    }
}