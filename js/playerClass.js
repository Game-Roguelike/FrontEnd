class Player {
    constructor(name, hp, strength, endurance) {
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.endurance = endurance;

        this.xp = 0;
        this.maxXp = 10;
        this.coins = 0;
        this.level = 1;
        this.points = 5;

        this.strengthPoint = 0;
        this.endurancePoint = 0;
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

    updateLevelAndXp() {
        if (this.level in lvl_dict && this.xp >= lvl_dict[this.level][0]) {
            this.level += 1;
            
            if (this.level in lvl_dict) {
                this.maxXp = lvl_dict[this.level][0];
            }

            
        }
    }

    addXp(experience) {
        this.xp += experience;
        this.updateLevelAndXp();
    }
}

const lvl_dict = {
    "1":[10],
    "2":[20],
    "3":[30],
    "4":[54]
};

const playersTypes = {
    strongman: new Player('Strongman', 20, 10, 1),
    tank: new Player('Tank', 40, 1, 1),
    hardyman: new Player('Hardyman', 20, 1, 10),
};

export {Player, playersTypes, lvl_dict};