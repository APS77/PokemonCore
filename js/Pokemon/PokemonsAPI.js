import Pokemon from './Pokemon.js';

let furret = new Pokemon({
    id: 0,
    name: "Furret",
    level: 50, 
    type1: "normal",
    type2: null,
    imgPaths: {
        front: '',
        back: 'img/pokemons/back/b_bw_162.png'
    }
});

furret.baseStats = {
    HP: 85,
    ATTACK: 76,
    DEFENSE: 64,
    SPATT: 45,
    SPDEF: 55,
    SPEED: 90
};

furret.currentHP = furret.baseStats.HP;

let bayleef = new Pokemon({
    id: 1,
    name: "Bayleef",
    level: 50,
    type1: "grass",
    type2: null,
    imgPaths: {
        front: 'img/pokemons/front/spr_bw_153.png',
        back: ''
    }
});

bayleef.baseStats = {
    HP: 60,
    ATTACK: 62,
    DEFENSE: 80,
    SPATT: 63,
    SPDEF: 80,
    SPEED: 60
};

bayleef.currentHP = bayleef.baseStats.HP;

export default {
    furret, bayleef
};