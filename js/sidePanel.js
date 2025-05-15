import { playersTypes } from "./playerClass.js";

export const player = playersTypes.strongman;

const maxHpElement = document.querySelector('#MaxHp');
const levelElement = document.querySelector('#Level');
const xpElement = document.querySelector('#Xp');
const coinsElement = document.querySelector('#Coins');
const strengthElement = document.querySelector('#Strength');
const enduranceElement = document.querySelector('#Endurance');
const pointsElement = document.querySelector('#Points');

const strengthButton = document.querySelector('#StrengthButton');
const enduranceButton = document.querySelector('#EnduranceButton');
const confirmButton = document.querySelector('#ConfirmButton');

maxHpElement.textContent = `MaxHp : ${player.hp}`;
levelElement.textContent = `Level : ${player.level}`;
xpElement.textContent = `Xp : ${player.xp}/${player.maxXp}`;
coinsElement.textContent = `Coins : ${player.coins}`;
strengthElement.textContent = `Strength : ${player.strength} (+0)`;
enduranceElement.textContent = `Endurance : ${player.endurance} (+0)`;
pointsElement.textContent = `Stat points : ${player.points}`;

strengthButton.onclick = function () {
    if (player.points > player.getTotalTempPoints()) {
        player.strengthPoint += 1;
        strengthElement.textContent = `Strength : ${player.strength} (+${player.strengthPoint})  `;
        updatePointsPreview();
    } else {
        alert('Not enough points!');
    }
};

enduranceButton.onclick = function () {
    if (player.points > player.getTotalTempPoints()) {
        player.endurancePoint += 1;
        enduranceElement.textContent = `Endurance : ${player.endurance} (+${player.endurancePoint}) `;
        updatePointsPreview();
    } else {
        alert('Not enough points!');
    }
};

confirmButton.onclick = function () {
    if (!player.canBeApplied()) {
        alert('Not a single point has been added.');
        return;
    }
    
    player.calculateAbilityPoints();

    strengthElement.textContent = `Strength : ${player.strength} (+0)  `;
    enduranceElement.textContent = `Endurance : ${player.endurance} (+0) `;
    pointsElement.textContent = `Stat points : ${player.points}`;
};

function updatePointsPreview() {
    let remaining = player.points - player.getTotalTempPoints();
    pointsElement.textContent = `Stat points : ${remaining}`;
}

export function visualUpdate() {
    maxHpElement.textContent = `MaxHp : ${player.hp}`;
    strengthElement.textContent = `Strength : ${player.strength} (+0)  `;
    enduranceElement.textContent = `Endurance : ${player.endurance} (+0) `;
}