// ATTACKS ATTRIBUTES      

export class Attack {
    constructor(name, attackType, category, pp, power, accuracy) {
        this.name = name;
        this.type = attackType;
        this.category = category; // fisico | especial | de estado
        this.pp = pp;
        this.power = power;
        this.accuracy = accuracy;
    }
}