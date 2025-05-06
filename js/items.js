class ItemEffect {
    constructor(HP, strength, endurance, DMGbonus, DMSresist, target) {
        this.target = target;
        this.HP = HP;
        this.strength = strength;
        this.endurance = endurance;
        this.DMGbonus = DMGbonus;
        this.DMSresist = DMSresist;
    }
}

export class Equipment extends ItemEffect{
    constructor(name, spriteIMG, type, HP, strength, endurance, DMGbonus, DMSresist, price) {
        super(HP, strength, endurance, DMGbonus, DMSresist, "player");
        
        this.name = name;
        this.spriteIMG = spriteIMG;
        this.type = type;
        this.price = price;
        
        const temp = this.generateEquipmentDescription();
        this.firstDescription = temp.firstDescription;
        this.secondDescription = temp.secondDescription;
        this.priceDescription = temp.priceDescription;
    }

    generateEquipmentDescription() {
        let inner = [];
        let type ;
        if (this.DMGbonus !== null) {
            inner[1] = `Increases player DMG by ${this.DMGbonus * 100}%`;
            type = `playerDMG`;
        } else if (this.DMSresist !== null) {
            inner[1] = `Decreases incoming DMG by ${this.DMSresist * 100}%`;
            type = `playerRES`;
        } else if (this.endurance !== null && this.strength !== null && this.endurance == this.strength) {
            inner[1] = `Increases player stats by ${this.endurance}%`;
            type = `playerSTATS`;
        }
    
        if (this.HP !== null) {
            inner[0] = `Max HP +${this.HP}`;
        } else if (this.endurance !== null && type !== `playerSTATS`) {
            inner[0] = `Endurance +${this.endurance}`;
        } else if (this.strength !== null && type !== `playerSTATS`) {
            inner[0] = `Strength +${this.strength}`;
        }
    
        return {
            firstDescription: inner[0],
            secondDescription: inner[1],
            priceDescription: `Price : ${this.price} Coins`
        }
    }
}

export class Weapon extends ItemEffect{
    constructor(name, spriteIMG, damage, strength, price, HP, DMGbonus) {
        super(HP, strength, null, DMGbonus, null, "player");
        
        this.name = name;
        this.spriteIMG = spriteIMG;
        this.price = price;

        this.type = "weapon";
        this.damage = damage;

        const temp = this.generateWeaponDescription();
        this.firstDescription = temp.firstDescription;
        this.secondDescription = temp.secondDescription;
        this.priceDescription = temp.priceDescription;
    }

    generateWeaponDescription() {
        let inner;
        if (this.DMGbonus !== null) {
            inner = `Increases player DMG by ${this.DMGbonus * 100}%`;
        } else if (this.HP !== null) {
            inner = `Heals player by ${this.HP * 100}% of damage dealt`;
        } else if (this.HP == null && this.DMGbonus == null) {
            inner = `This weapon has no special effect`;
        }
        
        return {
            firstDescription: `Damage +${this.damage}`,
            secondDescription: inner,
            priceDescription: `Price : ${this.price} Coins`
        }
    }
}

export class Usable extends ItemEffect{
    constructor(name, spriteIMG, price, target, HP, uses) {
        super(HP, null, null, null, null, target);
        
        this.name = name;
        this.spriteIMG = spriteIMG;
        this.price = price;

        this.uses = uses;
        this.type = "usable";

        const temp = this.generateUsableDescription();
        this.firstDescription = temp.firstDescription;
        this.secondDescription = temp.secondDescription;
        this.priceDescription = temp.priceDescription;
    }

    generateUsableDescription() {
        let inner;
        if (this.target == "player") {
            inner = `Heals ${this.HP} HP on use`;
        } else if (this.target == "enemy") {
            inner = `Deals ${this.HP} damage to enemy on use`;
        }

        return {
            firstDescription: inner,
            secondDescription: `Uses left : ${this.uses}`,
            priceDescription: `Price : ${this.price} Coins`
        }
    }
}