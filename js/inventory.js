import * as utilityScript from './utility.js';
import * as itemsScript from './items.js';

let isInventoryOpen = false;

let currentlyHolding = {
    isHoldingSomething: false,
    holdingItem: {}
}

const inventoryRows = 3;
const inventoryColumns = 8;

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
        type : itemsScript.ItemType.helmet,
        class : "slotHelmet"
    },
    {
        row : 1,
        column : 5,
        type : itemsScript.ItemType.chestplate,
        class : "slotChestplate"
    },
    {
        row : 1,
        column : 6,
        type : itemsScript.ItemType.hands,
        class : "slotHands"
    },
    {
        row : 1,
        column : 7,
        type : itemsScript.ItemType.boots,
        class : "slotBoots"
    },
    {
        row : 2,
        column : 4,
        type : itemsScript.ItemType.weapon,
        class : "slotWeapon"
    },
    {
        row : 2,
        column : 5,
        type : itemsScript.ItemType.keepsake,
        class : "slotKeepsake"
    },
    {
        row : 2,
        column : 6,
        type : itemsScript.ItemType.ring,
        class : "slotRing"
    },
    {
        row : 2,
        column : 7,
        type : itemsScript.ItemType.ring,
        class : "slotRing"
    },
]

let testItemChestplate = new itemsScript.Equipment("Shirt of Disgraced General", "../assets/Fallback/testChestplate.png", itemsScript.ItemType.chestplate, null, 1, null, null, 0.1, 25);
let testItemWeapon = new itemsScript.Weapon("Ax", "../assets/Fallback/testWeapon.png", 7, 7, 55, null, 0.1);
let testItemUsable = new itemsScript.Usable("Dragon's Blood", "../assets/Fallback/testUsable.png", 32, itemsScript.TargetType.player, 30, 3);

let playerInventory = Array.from({ length: inventoryRows }, () =>
  Array.from({ length: inventoryColumns }, () => null)
);

console.log(playerInventory)
const starterItems = [
    {
        row : 0,
        column : 0,
        item : testItemWeapon
    },
    {
        row : 0,
        column : 1,
        item : testItemChestplate
    },
    {
        row : 0,
        column : 2,
        item : testItemUsable
    },
]

fillInInventoryElement();

const inventorySlots = document.querySelectorAll('.inventoryStuff');

initializeInventory();
addClickEvent();

function fillInInventoryElement() {
    const mainElement = document.querySelector(".playerInventory")
    for (let r = 0; r < inventoryRows; r++) {
        mainElement.innerHTML += `
            <div class="inventoryRow"></div>
        `
        let secondaryElement = document.querySelectorAll(".inventoryRow")[r];
        for (let c = 0; c < inventoryColumns; c++) {
            if (r == 0 && c == 7) {
                secondaryElement.innerHTML += `
                    <span class="slotArrow"><img src="./assets/UI/arrowSlot.png" alt=""></span>
                `
            } else {
                secondaryElement.innerHTML += `
                    <div class="inventoryStuff">
                        <span class="inventorySlot"><img src="./assets/UI/blankPlaceholder.png" alt=""></span>
                    </div>
                `

                let inventoryStuff = secondaryElement.lastElementChild;
                let thirdlyElement = inventoryStuff.querySelector(".inventorySlot");

                if (r >= 1 && c >= 4) {
                    for (let i = 0; i < specialSlots.length; i++) {
                        const specialSlot = specialSlots[i];
                        if (specialSlot.row == r && specialSlot.column == c) {
                            thirdlyElement.classList.add(specialSlot.class);
                            break;
                        }
                    }
                } else {
                    thirdlyElement.classList.add("slotNormal");
                }

            }     
        }
    }
}

function initializeInventory(){
    let slotCount = 0;
    for(let r = 0; r < inventoryRows; r++) {
        for(let c = 0; c < inventoryColumns; c++) {
            if (r==0 && c == 7) continue;

            for(let i = 0; i < starterItems.length; i++){
                if(starterItems[i].row == r && starterItems[i].column == c){
                    playerInventory[r][c] = starterItems[i].item;
                    renderItem(starterItems[i].item, inventorySlots[slotCount]);
                    break;
                } else {
                    playerInventory[r][c] = null;
                }
            }
            slotCount++;
        }
    }
}

function renderItem(item, whichSlot) {
    if (item == placeholderItem) {
        whichSlot.classList.remove("slotInUse");
    } else {
        whichSlot.classList.add("slotInUse");
    }

    if (whichSlot.querySelector(".itemDescription") == null) {
        createDescriptionElement(whichSlot);
    }
    whichSlot.querySelector('.inventorySlot > img').src = item.spriteImage;

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
            if (r==0 && c == 7) continue;
            
            let slot = inventorySlots[slotCount];
            slot.onclick = () => handleSlotClick(slot, playerInventory[r][c], r, c);

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
                playerInventory[holdingItem.row][holdingItem.column] = secondItem;
                playerInventory[r][c] = holdingItem.item;
                renderItem(secondItem, holdingItem.element);
            } else {
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

function clearInventoryHighlights() {
    inventorySlots.forEach(element => {
        const inner = element.querySelector('.inventorySlot');
        inner.style.backgroundColor = "";
    });
}