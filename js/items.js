import { player, visualUpdate } from "./sidePanel.js";
import {removeItem, renderItem, inventoryRows, inventoryColumns, playerInventory, inventorySlots} from "./inventory.js"
import * as itemClass from "./itemClass.js";

export function equipItem(item) {
    if (item == null) return;

    player.damageBonus += item.effect.damageBonus;
    player.damageResist += item.effect.damageResist;
    player.strength += item.effect.strength;
    player.endurance += item.effect.endurance;

    if (item.type !== itemClass.ItemType.weapon) {
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

    if (item.type !== itemClass.ItemType.weapon) {
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