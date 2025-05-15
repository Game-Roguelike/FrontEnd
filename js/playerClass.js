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

        this.baseDamage = 1;
        this.damageBonus = 1;
        this.damageResist = 1;
        this.damageToHeal = 0;
        this.currentHp = this.hp;
    }

    getTotalTempPoints() {
        return this.strengthPoint + this.endurancePoint;
    }

    calculateAbilityPoints() {
        const totalToApply = this.getTotalTempPoints();

        this.strength += this.strengthPoint;
        this.endurance += this.endurancePoint;
        this.points -= totalToApply;

        this.strengthPoint = 0;
        this.endurancePoint = 0;
    }

    canBeApplied() {
        return this.getTotalTempPoints() !== 0;
    }

    resetPoints() {
        this.strengthPoint = 0;
        this.endurancePoint = 0;
    }
}

const playersTypes = {
    strongman: new Player('Strongman', 20, 10, 1),
    tank: new Player('Tank', 40, 1, 1),
    hardyman: new Player('Hardyman', 20, 1, 10),
};

export {Player, playersTypes};