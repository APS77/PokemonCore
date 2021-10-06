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

let scratch = new Attack("Scratch", "normal", PHYSICAL, 35, 40, 100),
    tackle = new Attack("Tackle", "normal", PHYSICAL, 35, 50, 100),
    slam = new Attack("Slam", "normal", PHYSICAL, 20, 80, 75);

export default {
    scratch,
    tackle,
    slam
};