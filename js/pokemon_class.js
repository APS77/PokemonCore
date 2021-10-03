

export class Pokemon {
    constructor(config) {
        let { name, level, type1, type2 } = config;
        this.name = name;
        this.level = level;
        this.type1 = type1;
        this.type2 = type2;
        this.attacks = []; // vector with 4 attacks
        this.stats = {}; // diccionario con stats
        this.currentStatus = 0; // 0:sano 1:envenenado 2:paralizado... y asi
        this.currentHP = 0;
    }
}