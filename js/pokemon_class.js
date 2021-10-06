

class Pokemon {
    constructor(config) {
        let { name, level, type1, type2, imgPaths } = config;
        this.name = name;
        this.level = level;
        this.type1 = type1;
        this.type2 = type2;
        this.attacks = []; // vector with 4 attacks
        this.baseStats = {}; // diccionario con baseStats
        this.currentStatus = 0; // 0:sano 1:envenenado 2:paralizado... y asi
        this.currentHP = 0;
        this.initializaSprites(imgPaths);
    }

    initializaSprites(imgPaths) {
        this.createSprites();
        this.setSprites(imgPaths);
    }

    createSprites() {
        this.sprites = {
            front: new Image(),
            back: new Image()
        };
    }

    setSprites(imgPaths) {
        let { front, back } = imgPaths;
        this.sprites.front.src = front;
        this.sprites.back.src = back;
    }
}

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