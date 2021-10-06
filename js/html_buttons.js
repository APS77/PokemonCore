function showAttackBtn(i) {
    let btn = document.createElement("button");
    //btn.textContent = pokemon1.attacks[i].name;
    btn.insertAdjacentText('afterbegin', pokemon1.attacks[i].name);
    btn.addEventListener("click", function () {
        console.log(`${pokemon1.name} used ${pokemon1.attacks[i].name}!`);
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

export function battleMenu() {
    let battleMenu = document.createElement("div");
    battleMenu.id = "battleMenu";
    document.body.appendChild(battleMenu);
    let para = document.createElement("P");
    para.innerText = `What should ${pokemon1.name} do?`;
    document.getElementById("battleMenu").appendChild(para);
    attackButton();
    runAwayButton();
}