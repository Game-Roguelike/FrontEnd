import * as utilityScript from './utility.js';
import * as itemsScript from './items.js';
import { player } from "./sidePanel.js";
import * as itemClass from "./itemClass.js";
import * as userInfo from "./userInfo.js";

let isInventoryOpen = false;

let currentlyHolding = {
    isHoldingSomething: false,
    holdingItem: {}
}

export const inventoryRows = 3;
export const inventoryColumns = 8;

const placeholderItem = {
    spriteImage: "../assets/UI/blankPlaceholder.png",
    name: "Object's name",
    firstDescription: "Stat bonus/Damage/Effect",
    secondDescription: "Effect/Number of uses",
    priceDescription: "Price : XX Coins"
}

const specialSlots = [
    {
        row : 1,
        column : 4,
        type : itemClass.ItemType.helmet,
        class : "slotHelmet"
    },
    {
        row : 1,
        column : 5,
        type : itemClass.ItemType.chestplate,
        class : "slotChestplate"
    },
    {
        row : 1,
        column : 6,
        type : itemClass.ItemType.hands,
        class : "slotHands"
    },
    {
        row : 1,
        column : 7,
        type : itemClass.ItemType.boots,
        class : "slotBoots"
    },
    {
        row : 2,
        column : 4,
        type : itemClass.ItemType.weapon,
        class : "slotWeapon"
    },
    {
        row : 2,
        column : 5,
        type : itemClass.ItemType.keepsake,
        class : "slotKeepsake"
    },
    {
        row : 2,
        column : 6,
        type : itemClass.ItemType.ring,
        class : "slotRing"
    },
    {
        row : 2,
        column : 7,
        type : itemClass.ItemType.ring,
        class : "slotRing"
    },
]

export let playerInventory = Array.from({ length: inventoryRows }, () =>
  Array.from({ length: inventoryColumns }, () => null)
);

const playerInfo = JSON.parse(sessionStorage.getItem("playerInfo"));

console.log(playerInfo)

const starterItems = [
    {
        row : 0,
        column : 0,
        item : playerInfo.item1
    },
    {
        row : 0,
        column : 1,
        item : playerInfo.item2
    },
    {
        row : 0,
        column : 2,
        item : playerInfo.item3
    },
]

fillInInventoryElement();

export const inventorySlots = document.querySelectorAll('.inventoryStuff');

initializeInventory();
addClickEvent();

function fillInInventoryElement() {
    const mainElement = document.querySelector(".playerInventory")
    for (let r = 0; r < inventoryRows; r++) {
        const inventoryRow = document.createElement("div");
        inventoryRow.classList.add("inventoryRow");
        mainElement.appendChild(inventoryRow);

        let secondaryElement = document.querySelectorAll(".inventoryRow")[r];
        for (let c = 0; c < inventoryColumns; c++) {
            if (r == 0 && c == 7) {
                const slotArrow = document.createElement("span");
                slotArrow.classList.add("slotArrow");

                const arrowImg = document.createElement("img");
                arrowImg.src = "./assets/UI/arrowSlot.png";
                arrowImg.alt = "";

                slotArrow.appendChild(arrowImg);
                inventoryRow.appendChild(slotArrow);
            } else {
                const inventoryStuff = document.createElement("div");
                inventoryStuff.classList.add("inventoryStuff");

                const inventorySlot = document.createElement("span");
                inventorySlot.classList.add("inventorySlot");

                const slotImg = document.createElement("img");
                slotImg.src = "./assets/UI/blankPlaceholder.png";
                slotImg.alt = "";

                inventorySlot.appendChild(slotImg);
                inventoryStuff.appendChild(inventorySlot);
                inventoryRow.appendChild(inventoryStuff);

                if (r >= 1 && c >= 4) {
                    for (let i = 0; i < specialSlots.length; i++) {
                        const specialSlot = specialSlots[i];
                        if (specialSlot.row === r && specialSlot.column === c) {
                            inventorySlot.classList.add(specialSlot.class);
                            break;
                        }
                    }
                } else {
                    inventorySlot.classList.add("slotNormal");
                }
            }   
        }
    }
}

function initializeInventory(){
    for(let i = 0; i < starterItems.length; i++){
        const starterItem = starterItems[i];

        playerInventory[starterItem.row][starterItem.column] = starterItem.item;
        renderItem(starterItem.item, inventorySlots[starterItem.column]);
    }
}

export function renderItem(item, whichSlot) {
    if (item == placeholderItem) {
        whichSlot.classList.remove("slotInUse");
    } else {
        whichSlot.classList.add("slotInUse");
    }

    if (whichSlot.querySelector(".itemDescription") == null) {
        createDescriptionElement(whichSlot);
    }

    const img = whichSlot.querySelector('.inventorySlot > img');

    img.src = item.spriteImage;
    img.onerror = () => {
        img.src = item.fallbackImage;
    };

    let inventoryItemDescription = whichSlot.querySelectorAll('.itemDescription > p');
                
    inventoryItemDescription[0].textContent = item.name;
    inventoryItemDescription[1].textContent = item.firstDescription;
    inventoryItemDescription[2].textContent = item.secondDescription;
    inventoryItemDescription[3].textContent = item.priceDescription;
}

function createDescriptionElement(where) {
    where.innerHTML += /*html*/`
        <div class="itemDescription">
            <p>Placeholder</p>
            <p>Placeholder</p>
            <p>Placeholder</p>
            <p>Placeholder</p>
        </div>
    `;
}

function addClickEvent(){
    let slotCount = 0;
    for(let r = 0; r < inventoryRows; r++) {
        for(let c = 0; c < inventoryColumns; c++) {
            if (r == 0 && c == 7) continue;
            
            let slot = inventorySlots[slotCount];
            slot.onclick = () => handleSlotClick(slot, playerInventory[r][c], r, c);

            if (r == 0) {
                slot.addEventListener("dblclick", () => {
                    triggerUseItem(slot, playerInventory[r][c])
                });
            }

            slotCount++;
        }
    }
}

function handleSlotClick(element, slot, r, c) {
    if (!isInventoryOpen) return;
    clearInventoryHighlights();
    
    if (!currentlyHolding.isHoldingSomething) {
        if (element.classList.contains("slotInUse")) {
            currentlyHolding.isHoldingSomething = true;
            currentlyHolding.holdingItem = {
                row: r,
                column: c,
                item: slot,
                element: element
            };
        }
        const innerSlot = element.querySelector('.inventorySlot');
        innerSlot.style.backgroundColor = "var(--element-shadow)"; 
    } else {
        const holdingItem = currentlyHolding.holdingItem;
        if (holdingItem.element !== element && isSpecialSlot(r, c)) {
            if (playerInventory[r][c] !== null) {
                let secondItem = playerInventory[r][c];
                doesAffectPlayer(r, c, holdingItem.item, secondItem);
                playerInventory[holdingItem.row][holdingItem.column] = secondItem;
                playerInventory[r][c] = holdingItem.item;
                renderItem(secondItem, holdingItem.element);
            } else {
                doesAffectPlayer(r, c, holdingItem.item, null);
                playerInventory[holdingItem.row][holdingItem.column] = null;
                playerInventory[r][c] = holdingItem.item;
                renderItem(placeholderItem, holdingItem.element);
            }
            renderItem(holdingItem.item, element);
        }
        clearCurrentlyHolding();
        clearInventoryHighlights();
    }
} 

function triggerUseItem(element, inventoryElement) {
    if (isInventoryOpen || inventoryElement.type !== itemClass.ItemType.usable) return;

    const messages = [
        "Use an item?",
        `The item "${inventoryElement.name}" will be used once`,
        `The effect "${inventoryElement.firstDescription}" will be applied`
    ] 

    const innerSlot = element.querySelector('.inventorySlot');
    innerSlot.style.backgroundColor = "var(--element-shadow)"; 

    utilityScript.showBigPopUp(messages, inventoryElement);

    setTimeout( () => {
        innerSlot.style.backgroundColor = ""; 
    }, 5000)
}

function isSpecialSlot(r, c) {
    let holdingItem = currentlyHolding.holdingItem;
    for (let i = 0; i < specialSlots.length; i++) {
        if (specialSlots[i].row == r && specialSlots[i].column == c) {
            return playerInventory[holdingItem.row][holdingItem.column].type == specialSlots[i].type; 
        }
    }
    return true;
}

function clearCurrentlyHolding() {
    currentlyHolding.isHoldingSomething = false;
    currentlyHolding.holdingItem = {};
}

document.querySelector(".slotArrow").onclick = function() {
    if (!isInventoryOpen) {
        moveInventory("-", 85, 0, 0);
        isInventoryOpen = true;
        utilityScript.unhideElement(".blackoutPanel")
    } else {
        moveInventory("+", 40, 180, 0.5);
        isInventoryOpen = false;
        setTimeout(() => utilityScript.hideElement(".blackoutPanel"), 400);

        clearInventoryHighlights();
        clearCurrentlyHolding();
    }
}

function moveInventory(direction, startVh, startDeg, startOpacity) {
    const duration = 300; // ms
    const startTime = performance.now();

    const endVh = direction === "+" ? startVh + 45 : startVh - 45;
    const endDeg =  direction === "+" ? startDeg + 180 : startDeg - 180;
    const endOpacity = direction === "+" ? startOpacity - 0.5 : startOpacity + 0.5;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1

        // Interpolate between start and end
        const currentVh = startVh + (endVh - startVh) * progress;
        const currentDeg = startDeg + (endDeg - startDeg) * progress;
        const currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;

        document.querySelector(".playerInventory").style.top = `${currentVh}vh`;
        document.querySelector(".slotArrow").style.rotate = `${currentDeg}deg`;
        document.querySelector(".blackoutPanel").style.opacity = currentOpacity;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

export function clearInventoryHighlights() {
    inventorySlots.forEach(element => {
        const inner = element.querySelector('.inventorySlot');
        inner.style.backgroundColor = "";
    });
}

function doesAffectPlayer(r, c, firstItem, secondItem) {
    let holdingItem = currentlyHolding.holdingItem;

    for (let i = 0; i < specialSlots.length; i++) {
        if (specialSlots[i].row == holdingItem.row && specialSlots[i].column == holdingItem.column) {
            itemsScript.disequipItem(firstItem);
            itemsScript.equipItem(secondItem);
        }
        if (specialSlots[i].row == r && specialSlots[i].column == c) {
            itemsScript.equipItem(firstItem);
            itemsScript.disequipItem(secondItem);
        }
    }
}

export function removeItem(where) {
    playerInventory[where.row][where.column] = null;
    renderItem(placeholderItem, where.slot);
}