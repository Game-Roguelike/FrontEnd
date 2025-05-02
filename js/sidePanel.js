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

class Player {
    constructor(name, hp, strength, endurance) {
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.endurance = endurance;

        this.xp = 0;
        this.maxXp = 6;
        this.coins = 0;
        this.level = 0;
        this.points = 5;

        this.strengthPoint = 0;
        this.endurancePoint = 0;
    }
}

const players = {
    strongman: new Player('Strongman', 20, 10, 1),
    tank: new Player('Tank', 40, 1, 1),
    hardyman: new Player('Hardyman', 20, 1, 10),
};

//currently will change after backend

maxHpElement.textContent = `MaxHp : ${players.strongman.hp}`;
levelElement.textContent = `Level : ${players.strongman.level}`;
xpElement.textContent = `Xp : ${players.strongman.xp}/${players.strongman.maxXp}`;
coinsElement.textContent = `Coins : ${players.strongman.coins}`;
strengthElement.textContent = `Strength : ${players.strongman.strength}`;
enduranceElement.textContent = `Endurance : ${players.strongman.endurance}`;
pointsElement.textContent = `Stat points : ${players.strongman.points}`;

strengthButton.onclick = function () {
    if (players.strongman.points > getTotalTempPoints()) {
        players.strongman.strengthPoint += 1;
        strengthElement.textContent = `Strength : ${players.strongman.strength} (+ ${players.strongman.strengthPoint})`;
        updatePointsPreview();
    } else {
        alert('Not enough points!');
    }
};

enduranceButton.onclick = function () {
    if (players.strongman.points > getTotalTempPoints()) {
        players.strongman.endurancePoint += 1;
        enduranceElement.textContent = `Endurance : ${players.strongman.endurance} (+ ${players.strongman.endurancePoint})`;
        updatePointsPreview();
    } else {
        alert('Not enough points!');
    }
};

confirmButton.onclick = function () {
    let totalToApply = getTotalTempPoints();

    if (totalToApply === 0) {
        alert('Not a single point has been added.');
        return;
    }

    players.strongman.strength += players.strongman.strengthPoint;
    players.strongman.endurance += players.strongman.endurancePoint;
    players.strongman.points -= totalToApply;

    strengthElement.textContent = `Strength :  ${players.strongman.strength}`;
    enduranceElement.textContent = `Endurance : ${players.strongman.endurance}`;
    pointsElement.textContent = `Stat points : ${players.strongman.points}`;

    players.strongman.strengthPoint = 0;
    players.strongman.endurancePoint = 0;
};

function getTotalTempPoints() {
    return players.strongman.strengthPoint + players.strongman.endurancePoint;
}

function updatePointsPreview() {
    let remaining = players.strongman.points - getTotalTempPoints();
    pointsElement.textContent = `Stat points : ${remaining}`;
}
