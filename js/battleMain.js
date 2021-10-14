import Pokemon from "./Pokemon/PokemonsAPI.js";
import Attack from "./attack_class.js";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = 760;
canvas.height = 400;

// Imagenes
const battleBG = new Image();
battleBG.src = "img/battle/battle3.png";

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
function drawBattle(pkmn1Sprites, pkmn2Sprites) {
    context.drawImage(battleBG, 0, 0, canvas.width, canvas.height);
    context.drawImage(pkmn1Sprites.back, 110, 130, 250, 250);
    context.drawImage(pkmn2Sprites.front, 410, 70, 200, 200);
}

export function launchBatlle(player) {
    inBattle = true;
    drawBattle(player.pokemons[0].sprites, Pokemon.bayleef.sprites);
    // call a function that show pokemon names and its hps
    battleHeader(player);
    battleMenu(); // Html Battle Buttons menu
}

// ### Battle HEADER ###

function battleHeader(player) {
    let div = createDiv("battleHeader");
    document.body.appendChild(div);
    playerPkmnInfo(player);
    wildPkmnInfo();
}

function playerPkmnInfo(player) {
    let pkmn1 = createDiv("playerPkmnInfo");
    document.getElementById("battleHeader").appendChild(pkmn1);
    showPlayerPkmnName(player);
    showPlayerPkmnHP(player);
}

function wildPkmnInfo() {
    let pkmn2 = createDiv("wildPkmnInfo");
    document.getElementById("battleHeader").appendChild(pkmn2);
    showWildPkmnName();
    showWildPkmnHP();
}

function showPlayerPkmnName(player) {
    let msg = createMessage(player.pokemons[0].name);
    document.getElementById("playerPkmnInfo").appendChild(msg);
}

function showWildPkmnName() {
    let msg = createMessage(Pokemon.bayleef.name);
    document.getElementById("wildPkmnInfo").appendChild(msg);
}

function showPlayerPkmnHP(player) {
    let msg = createMessage("HP: "+ player.pokemons[0].currentHP + "/" + player.pokemons[0].baseStats.HP);
    document.getElementById("playerPkmnInfo").appendChild(msg);
}

function showWildPkmnHP() {
    let msg = createMessage("HP: "+ Pokemon.bayleef.currentHP + "/" + Pokemon.bayleef.baseStats.HP);
    document.getElementById("wildPkmnInfo").appendChild(msg);
}

// Attacks
Pokemon.furret.attacks.push(Attack.scratch);
Pokemon.furret.attacks.push(Attack.slam);
Pokemon.furret.attacks.push(Attack.tackle);
Pokemon.furret.attacks.push(Attack.fire_punch);

new Battle(Pokemon.furret, Pokemon.bayleef);

/*###########################
  ### Battle menu buttons ###
  ###########################*/
function showPokemonAttacks() {
    for (let i = 0; i < 4; i++) {
        showAttackBtn(i);
    }
}
function showAttackBtn(i) {
    let btn = createButton(Pokemon.furret.attacks[i].name);
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
    let btn = createButton("Back");
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

function createButton(text) {
    let btn = document.createElement("button");
    btn.insertAdjacentText('afterbegin', text);
    return btn;
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
        showPokemonAttacks();
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
        let msg = createMessage("You got away safely!");
        document.getElementById("battleMenu").appendChild(msg);
    })
}

function battleMenu() {
    let div = createDiv("battleMenu");
    document.body.appendChild(div);
    let msg = createMessage(`What should ${Pokemon.furret.name} do?`);
    document.getElementById("battleMenu").appendChild(msg);
    attackButton();
    runAwayButton();
}