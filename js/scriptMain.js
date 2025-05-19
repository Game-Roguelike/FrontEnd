import * as itemClass from "./itemClass.js";
import * as userInfo from "./userInfo.js";

document.getElementById("newGameButton").onclick = () => {
    unhideElement(".gameMenuContainer");
    hideElement(".titleContainer");
}

document.getElementById("ToMainMenuButton").onclick = () => {
    unhideElement(".titleContainer");
    hideElement(".gameMenuContainer");
}

const HIDDEN_CLASS_NAME = "hidden";

function hideElement(elementClass) {
    document.querySelector(elementClass).classList.add(HIDDEN_CLASS_NAME);
}

function unhideElement(elementClass) {
    document.querySelector(elementClass).classList.remove(HIDDEN_CLASS_NAME);
}

//starter pack visual-html bit

const starterPackElements = document.querySelectorAll(".starterPackItems");

for (let i = 0; i < starterPackElements.length; i++) {
    const anElements = starterPackElements[i].querySelectorAll(".anElement");

    anElements.forEach(element => {
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("elementDescription");

        for (let j = 0; j < 3; j++) {
            const p = document.createElement("p");
            p.textContent = "placeholder text";
            descriptionDiv.appendChild(p);
        }

        element.appendChild(descriptionDiv);
    });
}

//starter pack logic

const dateFromBackend = await fetch("http://localhost:8080/game/sets")
  .then(response => response.json())
  //.then(data => console.log(data))
  .catch(error => console.error('Помилка:', error));

let starterPack = [{}, {}, {}];

for (let i = 0; i < dateFromBackend.length; i++) {
    starterPack[i].equipment = new itemClass.Equipment(dateFromBackend[i].equipment.name, dateFromBackend[i].equipment.sprite, dateFromBackend[i].equipment.type, dateFromBackend[i].equipment.effect.hp, dateFromBackend[i].equipment.effect.power, dateFromBackend[i].equipment.effect.stamina, dateFromBackend[i].equipment.effect.damage, dateFromBackend[i].equipment.effect.incomingDamage, dateFromBackend[i].equipment.price);
    starterPack[i].weapon = new itemClass.Weapon(dateFromBackend[i].weapon.name, dateFromBackend[i].weapon.sprite, dateFromBackend[i].weapon.damage, dateFromBackend[i].weapon.effect.power, dateFromBackend[i].weapon.price, dateFromBackend[i].weapon.effect.hp, dateFromBackend[i].weapon.effect.damage);
    if (dateFromBackend[i].itemUsable.effect.damage !== null) { dateFromBackend[i].itemUsable.effect.hp = dateFromBackend[i].itemUsable.effect.damage * -1; }
    starterPack[i].usable = new itemClass.Usable(dateFromBackend[i].itemUsable.name, dateFromBackend[i].itemUsable.sprite, dateFromBackend[i].itemUsable.price, dateFromBackend[i].itemUsable.effect.type, dateFromBackend[i].itemUsable.effect.hp, dateFromBackend[i].itemUsable.numberOfUnits) ;
    starterPack[i].sprite = "http://localhost:8080/game/image?path=" + dateFromBackend[i].sprite;

    starterPack[i].hp = dateFromBackend[i].hp;
    starterPack[i].stamina = dateFromBackend[i].stamina;
    starterPack[i].power = dateFromBackend[i].power;
}

for (let i = 0; i < starterPackElements.length; i++) {
    const anElements = starterPackElements[i].querySelectorAll(".anElement");

    // Character info
    const charParagraphs = anElements[0].querySelectorAll("p");
    charParagraphs[0].textContent = 'Starter HP : ' + starterPack[i].hp;
    charParagraphs[1].textContent = 'Starter Strength : ' + starterPack[i].power;
    charParagraphs[2].textContent = 'Starter Endurance : ' + starterPack[i].stamina;
    anElements[0].querySelector("img").src = starterPack[i].sprite;

    // Items: equipment, weapon, usable
    const items = [starterPack[i].weapon, starterPack[i].equipment, starterPack[i].usable];

    for (let j = 0; j < items.length; j++) {
        const itemParagraphs = anElements[j + 1].querySelectorAll("p");

        itemParagraphs[0].textContent = items[j].name;
        itemParagraphs[1].textContent = items[j].firstDescription;
        itemParagraphs[2].textContent = items[j].secondDescription;

        anElements[j + 1].querySelector("img").src = items[j].spriteImage;
        anElements[j + 1].querySelector("img").onerror = () => {
            anElements[j + 1].querySelector("img").src = items[j].fallbackImage;
        };
    }
}

let selectedStarterPack = null;

document.querySelector(".pack1").onclick = function() {
    selectedStarterPack = starterPack[0];
    document.querySelector(".pack1").classList.add("selectedPack")

    document.querySelector(".pack3").classList.remove("selectedPack");
    document.querySelector(".pack2").classList.remove("selectedPack");
}

document.querySelector(".pack2").onclick = function() {
    selectedStarterPack = starterPack[1];
    document.querySelector(".pack2").classList.add("selectedPack")

    document.querySelector(".pack3").classList.remove("selectedPack");
    document.querySelector(".pack1").classList.remove("selectedPack");
}

document.querySelector(".pack3").onclick = function() {
    selectedStarterPack = starterPack[2];
    document.querySelector(".pack3").classList.add("selectedPack")

    document.querySelector(".pack1").classList.remove("selectedPack");
    document.querySelector(".pack2").classList.remove("selectedPack");
}

//passing info logic

document.querySelector("#fakeStartGameButton").onclick = function() {
    let username = document.querySelector("#username").value;

    if (selectedStarterPack !== null && username.length >= 2) {
        userInfo.playerInfo.username = username;
        userInfo.playerInfo.character = [username, selectedStarterPack.hp, selectedStarterPack.power, selectedStarterPack.stamina];
        userInfo.playerInfo.item1 = selectedStarterPack.equipment;
        userInfo.playerInfo.item2 = selectedStarterPack.weapon;
        userInfo.playerInfo.item3 = selectedStarterPack.usable;
        userInfo.playerInfo.sprite = selectedStarterPack.sprite;

        sessionStorage.setItem("playerInfo", JSON.stringify(userInfo.playerInfo));2
        console.log(selectedStarterPack);

        hideElement("#fakeStartGameButton");
        unhideElement("#startGameButton");
    }
}