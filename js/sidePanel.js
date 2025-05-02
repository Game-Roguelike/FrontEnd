const maxHpElement = document.querySelector('#MaxHp');
const levelElement = document.querySelector('#Level');
const xpElement = document.querySelector('#Xp');
const coinsElement = document.querySelector('#Coins');
const strengthElement = document.querySelector('#Strength');
const enduranceElement = document.querySelector('#Endurance');
const pointsElement = document.querySelector('#Points');

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
    }
}

const players = {
    strongman: new Player('Strongman', 20, 10, 1),
    tank: new Player('Tank', 40, 1, 1),
    hardyman: new Player('Hardyman', 20, 1, 10),
};

//currently will change after backend

maxHpElement.textContent = 'MaxHp : ' + players.strongman.hp;
levelElement.textContent = 'Level : ' + players.strongman.level;
xpElement.textContent = 'Xp : ' + players.strongman.xp + '/' + players.strongman.maxXp;
coinsElement.textContent = 'Coins : ' + players.strongman.coins;
strengthElement.textContent = 'Strength : ' + players.strongman.strength;
enduranceElement.textContent = 'Endurance : ' + players.strongman.endurance;
pointsElement.textContent = 'Stat points : ' + players.strongman.points;

const StrengthButton = document.querySelector('#StrengthButton');
const EnduranceButton = document.querySelector('#EnduranceButton');
const ConfirmButton = document.querySelector('#ConfirmButton');

let tempPoints = {
    strength: 0,
    endurance: 0,
};

StrengthButton.onclick = function () {
    if (players.strongman.points > getTotalTempPoints()) {
        tempPoints.strength += 1;
        document.querySelector('#Strength').textContent = 'Strength : ' + players.strongman.strength + ' (+' + tempPoints.strength + ')';
        updatePointsPreview();
    } else {
        alert('Not enough points!');
    }
};

EnduranceButton.onclick = function () {
    if (players.strongman.points > getTotalTempPoints()) {
        tempPoints.endurance += 1;
        document.querySelector('#Endurance').textContent = 'Endurance : ' + players.strongman.endurance + ' (+' + tempPoints.endurance + ')';
        updatePointsPreview();
    } else {
        alert('Not enough points!');
    }
};

ConfirmButton.onclick = function () {
    let totalToApply = getTotalTempPoints();

    if (totalToApply === 0) {
        alert('Not a single point has been added.');
        return;
    }

    players.strongman.strength += tempPoints.strength;
    players.strongman.endurance += tempPoints.endurance;
    players.strongman.points -= totalToApply;

    document.querySelector('#Strength').textContent = 'Strength : ' + players.strongman.strength;
    document.querySelector('#Endurance').textContent = 'Endurance : ' + players.strongman.endurance;
    document.querySelector('#Points').textContent = 'Stat points : ' + players.strongman.points;

    tempPoints.strength = 0;
    tempPoints.endurance = 0;
};

function getTotalTempPoints() {
    return tempPoints.strength + tempPoints.endurance;
}

function updatePointsPreview() {
    let remaining = players.strongman.points - getTotalTempPoints();
    document.querySelector('#Points').textContent = 'Stat points : ' + remaining;
}
