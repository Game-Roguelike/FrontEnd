import * as utilityScript from './utility.js';
import * as itemsScript from './items.js';

let isInventoryOpen = false;

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

const inventorySlots = document.querySelectorAll('.inventoryStuff');

const dummyItem = {
    spriteIMG: "../assets/UI/blankPlaceholder.png",
    name: "Object's name",
    firstDescription: "Stat bonus/Damage/Effect",
    secondDescription: "Effect/Number of uses",
    priceDescription: "Price : XX Coins"
}

let testItemChestplate = new itemsScript.Equipment("Shirt of Disgraced General", "../assets/Fallback/testChestplate.png", "chestplate", null, 1, null, null, 0.1, 25);
let testItemWeapon = new itemsScript.Weapon("Ax", "../assets/Fallback/testWeapon.png", 7, 7, 55, null, 0.1);
let testItemUsable = new itemsScript.Usable("Dragon's Blood", "../assets/Fallback/testUsable.png", 32, "player", 30, 3);

let playerInventory = [[false, false, false, testItemChestplate, false, false, false, false], 
                       [false, testItemUsable, false, false, false, false, false, false],
                       [false, false, testItemWeapon, false, false, false, false, false]]

let currentlyHolding = {
    isHoldingSomething: false,
    primaryHeldItem: false,
    primaryType: null,
    secondaryHeldItem: false,
    firstSpot: [],
    secondSpot: []
}

function clearInventoryHighlights() {
    inventorySlots.forEach(element => {
        const inner = element.querySelector('.inventorySlot');
        inner.style.backgroundColor = "";
    });
}

inventorySlots.forEach(slot => {
    slot.addEventListener('click', () => {
        if (!isInventoryOpen) return;

        // logic starts here
        clearInventoryHighlights();

        //"pick up" the clicked one
        if (!currentlyHolding.isHoldingSomething) {
            currentlyHolding.isHoldingSomething = true;
            let [r, c] = getItemPosition(slot);
            currentlyHolding.primaryHeldItem = playerInventory[r][c];
            currentlyHolding.primaryType = playerInventory[r][c].type;
            currentlyHolding.firstSpot = [r, c];

            const innerSlot = slot.querySelector('.inventorySlot');
            innerSlot.style.backgroundColor = "var(--element-shadow)";
        } else { //change position of an item
            let [r, c] = getItemPosition(slot);
            if (!playerInventory[r][c]) {
                currentlyHolding.secondSpot = [r, c];
                checkForSpecialSlot([r, c]);
            } else {
                currentlyHolding.secondaryHeldItem = playerInventory[r][c];
                currentlyHolding.secondSpot = [r, c];
                checkForSpecialSlot([r, c]);
            }
        }
    });
});

inventoryVisualUpdate();

function inventoryVisualUpdate() {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
            if (playerInventory[r][c] !== false) {
                let itemCall = playerInventory[r][c];
                let slotPosition = ".row" + r + "slot" + c;
                let inventorySlot = document.querySelector(slotPosition);
                if (!inventorySlot) {
                    continue; // skip this loop iteration
                }
                if (!inventorySlot.classList.contains("slotInUse")) {
                    inventorySlot.classList.add("slotInUse");
                };

                visualTextUpdate(itemCall, inventorySlot)
            } else {
                let slotPosition = ".row" + r + "slot" + c;
                let inventorySlot = document.querySelector(slotPosition);
                if (!inventorySlot) {
                    continue; // skip this loop iteration
                }
                if (inventorySlot.classList.contains("slotInUse")) {
                    inventorySlot.classList.remove("slotInUse");
                };

                visualTextUpdate(dummyItem, inventorySlot)
            }
        }
    }
}

function visualTextUpdate(whatItem, where) {
    let inventoryItemDescription = where.querySelectorAll('.itemDescription > p');

    where.querySelector('.inventorySlot > img').src = whatItem.spriteIMG;
                
    inventoryItemDescription[0].textContent = whatItem.name;
    inventoryItemDescription[1].textContent = whatItem.firstDescription;
    inventoryItemDescription[2].textContent = whatItem.secondDescription;
    inventoryItemDescription[3].textContent = whatItem.priceDescription;
}

function clearCurrentlyHolding() {
    currentlyHolding.isHoldingSomething = false;
    currentlyHolding.primaryHeldItem = false;
    currentlyHolding.secondaryHeldItem = false;
    currentlyHolding.firstSpot = "";
    currentlyHolding.secondSpot = "";
}

function getItemPosition(inventorySlot) {
    let allClasses = inventorySlot.className.split(" ");
    let positionClass;

    for (let i = 0; i < allClasses.length; i++) {
        if (allClasses[i].includes("row")) {
            positionClass = allClasses[i];
            break;
        }
    }

    let positionInArray = [];
    positionInArray[0] = positionClass.at(3);
    positionInArray[1] = positionClass.at(-1);

    return positionInArray;
}

const specialSlots = [["helmet", "chestplate", "boots", "hands"],
                      ["weapon", "keepsake", "ring", "ring"]]

function checkForSpecialSlot(arrayWhere) {
    if (arrayWhere[0] >= 1 && arrayWhere[1] >= 4) {
        let atSpecial = specialSlots[arrayWhere[0] - 1][arrayWhere[1] - 4];
        if (atSpecial == currentlyHolding.primaryType){
            moveItemInInventory();
        } else {
            clearCurrentlyHolding();
            clearInventoryHighlights();
        }

    } else {
        moveItemInInventory();
    }
}

function moveItemInInventory() {
    playerInventory[currentlyHolding.firstSpot[0]][currentlyHolding.firstSpot[1]] = currentlyHolding.secondaryHeldItem;
    playerInventory[currentlyHolding.secondSpot[0]][currentlyHolding.secondSpot[1]] = currentlyHolding.primaryHeldItem;
    inventoryVisualUpdate();
    clearCurrentlyHolding();
}