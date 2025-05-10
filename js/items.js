export const TargetType = {
    enemy : "Enemy",
    player : "Player"
}

export const ItemType = {
    helmet : "Helmet",
    chestplate : "Body",
    hands : "Gloves",
    boots : "Legs",
    weapon : "Weapon",
    keepsake : "Amulet",
    ring : "Ring",
    usable : "Usable"
}

class ItemEffect {
    constructor(hp, strength, endurance, damageBonus, damageResist, target) {
        this.target = target;
        this.hp = hp;
        this.strength = strength;
        this.endurance = endurance;
        this.damageBonus = damageBonus;
        this.damageResist = damageResist;
    }

    isEffectDamageBonus() {
        return this.damageBonus !== null;
    }

    isEffectDamageResist() {
        return this.damageResist !== null;
    }

    isEffectHp() {
        return this.hp !== null;
    }

    isEffectEndurance() {
        return this.endurance !== null;
    }

    isEffectStrength() {
        return this.strength !== null;
    }

    isTargetPlayer() {
        return this.target == TargetType.player;
    }

    isTargetEnemy() {
        return this.target == TargetType.enemy;
    }
}

export class Equipment{
    constructor(name, spriteImage, type, hp, strength, endurance, damageBonus, damageResist, price) {
        this.name = name;
        this.spriteImage = spriteImage;
        this.type = type;
        this.price = price;
        
        this.effect = new ItemEffect(hp, strength, endurance, damageBonus, damageResist, TargetType.player);

        const temp = this.generateEquipmentDescription();
        this.firstDescription = temp.firstDescription;
        this.secondDescription = temp.secondDescription;
        this.priceDescription = temp.priceDescription;
    }

    generateEquipmentDescription() {
        let inner = [];
        const effect = this.effect;

        if (effect.isEffectDamageBonus()) {
            inner[1] = `Increases player damage by ${effect.damageBonus * 100}%`;
        } else if (effect.isEffectDamageResist()) {
            inner[1] = `Decreases incoming damage by ${effect.damageResist * 100}%`;
        } else if (effect.isEffectEndurance() !== null && effect.isEffectStrength() !== null) {
            inner[1] = `Increases player stats by ${effect.endurance}`;
        }
    
        if (effect.isEffectHp()) {
            inner[0] = `Max HP +${effect.hp}`;
        } else if (effect.isEffectEndurance()) {
            inner[0] = `Endurance +${effect.endurance}`;
        } else if (effect.isEffectStrength()) {
            inner[0] = `Strength +${effect.strength}`;
        }
    
        return {
            firstDescription: inner[0],
            secondDescription: inner[1],
            priceDescription: `Price : ${this.price} Coins`
        }
    }

    
}

export class Weapon{
    constructor(name, spriteImage, damage, strength, price, hp, damageBonus) {
        this.name = name;
        this.spriteImage = spriteImage;
        this.price = price;

        this.effect = new ItemEffect(hp, strength, null, damageBonus, null, TargetType.player);

        this.type = ItemType.weapon;
        this.damage = damage;

        const temp = this.generateWeaponDescription();
        this.firstDescription = temp.firstDescription;
        this.secondDescription = temp.secondDescription;
        this.priceDescription = temp.priceDescription;
    }

    generateWeaponDescription() {
        let inner;
        const effect = this.effect;

        if (effect.isEffectDamageBonus()) {
            inner = `Increases player damage by ${effect.damageBonus * 100}%`;
        } else if (effect.isEffectHp()) {
            inner = `Heals player by ${effect.hp * 100}% of damage dealt`;
        } else {
            inner = `This weapon has no special effect`;
        }
        
        return {
            firstDescription: `Damage +${this.damage}`,
            secondDescription: inner,
            priceDescription: `Price : ${this.price} Coins`
        }
    }
}

export class Usable{
    constructor(name, spriteImage, price, target, hp, uses) {
        this.name = name;
        this.spriteImage = spriteImage;
        this.price = price;

        this.effect = new ItemEffect(hp, null, null, null, null, target);

        this.uses = uses;
        this.type = ItemType.usable;

        const temp = this.generateUsableDescription();
        this.firstDescription = temp.firstDescription;
        this.secondDescription = temp.secondDescription;
        this.priceDescription = temp.priceDescription;
    }

    generateUsableDescription() {
        let inner;
        const effect = this.effect;

        if (effect.isTargetPlayer()) {
            inner = `Heals ${effect.hp} HP on use`;
        } else if (effect.isTargetEnemy()) {
            inner = `Deals ${effect.hp} damage to enemy on use`;
        }

        return {
            firstDescription: inner,
            secondDescription: `Uses left : ${this.uses}`,
            priceDescription: `Price : ${this.price} Coins`
        }
    }
}
