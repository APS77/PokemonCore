class Attack {
    constructor(name, attackType, category, pp, power, accuracy) {
        this.name = name;
        this.type = attackType;
        this.category = category; // fisico | especial | de estado
        this.pp = pp;
        this.power = power;
        this.accuracy = accuracy;
    }
}

const PHYSICAL = "Physical",
    SPECIAL = "Special",
    STATUS = "Status";  

let scratch = new Attack("Scratch", "normal", PHYSICAL, 35, 5, 100),
    tackle = new Attack("Tackle", "normal", PHYSICAL, 35, 10, 100),
    slam = new Attack("Slam", "normal", PHYSICAL, 20, 20, 75),
    fire_punch = new Attack("Fire Punch", "fire", PHYSICAL, 15, 15, 100),
    razor_leaf = new Attack("Razor Leaf", "grass", PHYSICAL, 25, 15, 95);

export default {
    scratch,
    tackle,
    slam,
    fire_punch,
    razor_leaf
};