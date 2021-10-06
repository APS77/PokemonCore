export default class Pokemon {
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