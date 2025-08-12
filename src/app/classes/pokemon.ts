export default interface Pokemon {
	id: number;
	name: string;
	englishName: string;
	generation: number;
	sprite: string;
	types: string[];
	height: number;
	weight: number;
	catchrate: number;
}
