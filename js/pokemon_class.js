

class Pokemon {
    constructor(config) {
        let { name, level, type1, type2 } = config;
        this.name = name;
        this.level = level;
        this.type1 = type1;
        this.type2 = type2;
        this.attacks = []; // vector with 4 attacks
        this.baseStats = {}; // diccionario con baseStats
        this.currentStatus = 0; // 0:sano 1:envenenado 2:paralizado... y asi
        this.currentHP = 0;
        this.sprites = {
            front: null,
            back: null
        };
    }
}

/* const STATS = {
    HP: "HP",
    ATTACK: "Attack",
    DEFENSE: "Defense",
    SPATT: "SpAttack",
    SPDEF: "SpDefense",
    SPEED: "Speed"
}; */

let furret = new Pokemon({
    name: "Furret",
    level: 50, 
    type1: "normal",
    type2: null
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
    name: "Bayleef",
    level: 50,
    type1: "grass",
    type2: null
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