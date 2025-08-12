import { Component, input } from "@angular/core";
import Pokemon from "../../classes/pokemon";

@Component({
    selector: 'PokemonBlock',
    templateUrl: './pokemonblock.html'
})
export default class PokemonBlock {
    pokemon = input<Pokemon>();
}