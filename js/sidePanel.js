class Player {
    constructor(name, hp, strength, endurance) {
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.endurance = endurance;

        this.xp = 0;
        this.coins = 0;
        this.level = 0;
        this.points = 5;
    }
}

let players = {
    Strongman: new Player('Strongman', 20, 10, 1),
    Tank: new Player('Tank', 40, 1, 1),
    Hardyman: new Player('Hardyman', 20, 1, 10),
};

//currently will change after backend
let maxXp = 6;

document.getElementById('MaxHp').textContent = 'MaxHp : ' + players.Strongman.hp;
document.getElementById('Level').textContent = 'Level : ' + players.Strongman.level;
document.getElementById('Xp').textContent = 'Xp : ' + players.Strongman.xp + '/' + maxXp;
document.getElementById('Coins').textContent = 'Coins : ' + players.Strongman.coins;
document.getElementById('Strength').textContent = 'Strength : ' + players.Strongman.strength;
document.getElementById('Endurance').textContent = 'Endurance : ' + players.Strongman.endurance;
document.getElementById('Points').textContent = 'Stat points : ' + players.Strongman.points;

let strength_Button = document.getElementById('strength_Button');
let endurance_Button = document.getElementById('endurance_Button');

let selectedStat = null;
let tempPoints = {
    strength: 0,
    endurance: 0,
};

strength_Button.onclick = function () {
    if (players.Strongman.points > getTotalTempPoints()) {
        tempPoints.strength += 1;
        document.getElementById('Strength').textContent = 'Strength : ' + players.Strongman.strength + ' (+' + tempPoints.strength + ')';
    } else {
        alert('Not enough points!');
    }
};

endurance_Button.onclick = function () {
    if (players.Strongman.points > getTotalTempPoints()) {
        tempPoints.endurance += 1;
        document.getElementById('Endurance').textContent = 'Endurance : ' + players.Strongman.endurance + ' (+' + tempPoints.endurance + ')';
    } else {
        alert('Not enough points!');
    }
};

confirm_Button.onclick = function () {
    let totalToApply = getTotalTempPoints();

    if (totalToApply === 0) {
        alert('Not a single point has been added.');
        return;
    }

    players.Strongman.strength += tempPoints.strength;
    players.Strongman.endurance += tempPoints.endurance;
    players.Strongman.points -= totalToApply;

    document.getElementById('Strength').textContent = 'Strength : ' + players.Strongman.strength;
    document.getElementById('Endurance').textContent = 'Endurance : ' + players.Strongman.endurance;
    document.getElementById('Points').textContent = 'Points : ' + players.Strongman.points;

    tempPoints.strength = 0;
    tempPoints.endurance = 0;
};

function getTotalTempPoints() {
    return tempPoints.strength + tempPoints.endurance;
}
