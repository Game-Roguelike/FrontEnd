import { player, visualUpdate } from "./sidePanel.js";
import {removeItem, renderItem, inventoryRows, inventoryColumns, playerInventory, inventorySlots} from "./inventory.js"

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

export class Equipment {
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

        if (this.effect.isEffectDamageBonus()) {
            inner[1] = `Increases player damage by ${this.effect.damageBonus * 100}%`;
        } else if (this.effect.isEffectDamageResist()) {
            inner[1] = `Decreases incoming damage by ${this.effect.damageResist * 100}%`;
        } else if (this.effect.isEffectEndurance() !== null && this.effect.isEffectStrength() !== null) {
            inner[1] = `Increases player stats by ${this.effect.endurance}`;
        }
    
        if (this.effect.isEffectHp()) {
            inner[0] = `Max HP +${this.effect.hp}`;
        } else if (this.effect.isEffectEndurance()) {
            inner[0] = `Endurance +${this.effect.endurance}`;
        } else if (this.effect.isEffectStrength()) {
            inner[0] = `Strength +${this.effect.strength}`;
        }
    
        return {
            firstDescription: inner[0],
            secondDescription: inner[1],
            priceDescription: `Price : ${this.price} Coins`
        }
    }

    
}

export class Weapon {
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

        if (this.effect.isEffectDamageBonus()) {
            inner = `Increases player damage by ${this.effect.damageBonus * 100}%`;
        } else if (this.effect.isEffectHp()) {
            inner = `Heals player by ${this.effect.hp * 100}% of damage dealt`;
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

export class Usable {
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

        if (this.effect.isTargetPlayer()) {
            inner = `Heals ${this.effect.hp} HP on use`;
        } else if (this.effect.isTargetEnemy()) {
            inner = `Deals ${this.effect.hp} damage to enemy on use`;
        }

        return {
            firstDescription: inner,
            secondDescription: `Uses left : ${this.uses}`,
            priceDescription: `Price : ${this.price} Coins`
        }
    }
}

export function equipItem(item) {
    if (item == null) return;

    player.damageBonus += item.effect.damageBonus;
    player.damageResist += item.effect.damageResist;
    player.strength += item.effect.strength;
    player.endurance += item.effect.endurance;

    if (item.type !== ItemType.weapon) {
        player.hp += item.effect.hp;
    } else {
        player.damageToHeal += item.effect.hp;
        player.baseDamage += item.damage;
    }

    visualUpdate();
}

export function disequipItem(item) {
    if (item == null) return;

    player.damageBonus -= item.effect.damageBonus;
    player.damageResist -= item.effect.damageResist;
    player.strength -= item.effect.strength;
    player.endurance -= item.effect.endurance;

    if (item.type !== ItemType.weapon) {
        player.hp -= item.effect.hp;
    } else {
        player.damageToHeal -= item.effect.hp;
        player.baseDamage -= item.damage;
    }

    visualUpdate();
}

export function useItem(item) {
    item.uses -= 1;
    let where = findItemSlot(item);
    if (item.effect.isTargetPlayer()) {
        player.currentHp += item.effect.hp;
        document.querySelector(".currentHealth.playerHealth").textContent = `${player.currentHp}/${player.hp}`

        item.secondDescription = item.generateUsableDescription().secondDescription;

        renderItem(item, where.slot);
        //update healthbar logic
    }
    //enemy target logic
    if (item.uses == 0) {
        removeItem(where);
    }
}

function findItemSlot(item) {
    for (let r = 0; r < inventoryRows; r++) {
        for (let c = 0; c < inventoryColumns; c++) {
            if (playerInventory[r][c] == item) {
                let slot = c
                return {
                    slot : inventorySlots[slot],
                    row : r,
                    column : c
                }
            }
        }
    }
}