import Pokemon from "./pokemon_class.js";
import Attack from "./attack_class.js";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = 760;
canvas.height = 400;

// Imagenes
const battleBG = new Image();
battleBG.src = "img/battle/battle3.png";
const pkmn1 = new Image();
pkmn1.src = "img/pokemons/back/b_bw_162.png";
const pkmn2 = new Image();
pkmn2.src = "img/pokemons/front/spr_bw_153.png";

export let inBattle = false;

const DO_ATTACK = "attack",
    DO_ATTACK_SELECTION = "selected_attack";

class Battle {
    constructor(pkmn1, pkmn2) {
        this.pkmn1 = pkmn1;
        this.pkmn2 = pkmn2;
        this.currentTurn = 0;
    }

    isFinished() {
        return this.pkmn1.currentHP <= 0 || this.pkmn2.currentHP <= 0 // si algun pokemon fue debilitado
    }
}

class Turn {
    constructor() {
        this.command1 = null;
        this.command2 = null;
    }

    canStart() {
        return this.command1 != null && this.command2 != null;
    }
}

class Command {
    constructor(action) {
        this.action = action; // Por ejemplo atacar
    }
}

// BATTLE MAIN ------------------------------------------------------------------------------------------
function drawBattle(pkmn1, pkmn2) {
    context.drawImage(battleBG, 0, 0, canvas.width, canvas.height);
    context.drawImage(pkmn1, 110, 130, 250, 250);
    context.drawImage(pkmn2, 410, 70, 200, 200);
}

export function launchBatlle() {
    inBattle = true;
    drawBattle(pkmn1, pkmn2);
    battleMenu();
}

// Attacks
Pokemon.furret.attacks.push(Attack.scratch);
Pokemon.furret.attacks.push(Attack.slam);
Pokemon.furret.attacks.push(Attack.tackle);

let battle = new Battle(Pokemon.furret, Pokemon.bayleef);

/*###########################
  ### Battle menu buttons ###
  ###########################*/
function showAttackBtn(i) {
    let btn = document.createElement("button");
    //btn.textContent = Pokemon.furret.attacks[i].name;
    btn.insertAdjacentText('afterbegin', Pokemon.furret.attacks[i].name);
    btn.addEventListener("click", function () {
        console.log(`${Pokemon.furret.name} used ${Pokemon.furret.attacks[i].name}!`);
    });
    document.getElementById("attackMenu").appendChild(btn);
}

function resetBattleMenu() {
    let reset = document.getElementById("battleMenu");
    reset.remove()
    battleMenu();
}

function backButton() {
    let btn = document.createElement("button");
    btn.innerHTML = "Back";
    btn.addEventListener("click", function () {
        console.log("Clicked on Back!");
        resetBattleMenu();
    })
    document.getElementById("battleMenu").appendChild(btn);
}

function clearBox(elementID) {
    let div = document.getElementById(elementID);

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function createDiv(elementID) {
    let div = document.createElement("div");
    div.id = elementID;
    return div;
}

function createMessage(texto) {
    let msg = document.createElement("p");
    msg.innerText = texto;
    return msg;
}

function attackButton() {
    let btn = document.createElement("button");
    btn.id = "attackBtn";
    btn.innerHTML = "Attack";
    btn.addEventListener("click", function () {
        console.log("Clicked on Attack!");
        clearBox("battleMenu");
        let div = createDiv("attackMenu");
        document.getElementById("battleMenu").appendChild(div);
        let msg = createMessage("Choose your move:");
        document.getElementById("attackMenu").appendChild(msg);
        showAttackBtn(0);
        showAttackBtn(1);
        showAttackBtn(2);
        backButton();

    })
    document.getElementById("battleMenu").appendChild(btn);
}

function runAwayButton() {
    let btn = document.createElement("button");
    btn.id = "runAwayBtn";
    btn.innerHTML = "Run Away";
    document.getElementById("battleMenu").appendChild(btn);
    btn.addEventListener("click", function () {
        console.log("You got away safely!")
        clearBox("battleMenu");
        let msg = document.createElement("p");
        msg.innerText = "You got away safely!";
        document.getElementById("battleMenu").appendChild(msg);
    })
}

function battleMenu() {
    let battleMenu = document.createElement("div");
    battleMenu.id = "battleMenu";
    document.body.appendChild(battleMenu);
    let para = document.createElement("P");
    para.innerText = `What should ${Pokemon.furret.name} do?`;
    document.getElementById("battleMenu").appendChild(para);
    attackButton();
    runAwayButton();
}