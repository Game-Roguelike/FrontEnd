import * as inventoryScript from './inventory.js';
import * as utilityScript from './utility.js';

const levelPopUp = document.querySelector(".levelPopUp");
const roomElementsExtars = [".traderRoom", ".nextRoomBtn", ".combatRoom", ".enemyElement"];

//temporal bit till we get the game sequense going

document.getElementsByClassName("controlButton")[0].onclick = function() { //clear pop ups
    triggerLevelPopUp(100, 0);
    
    setTimeout(() => {
        utilityScript.hideElement(".levelPopUp");
        levelPopUp.classList.remove("victoryPop", "levelPop", "defeatPop");
    }, 400)
}

document.getElementsByClassName("controlButton")[1].onclick = function() { //victory pop up
    document.getElementsByClassName("popUpText")[0].textContent = `Victory!`;
    document.getElementsByClassName("popUpText")[1].textContent = `You've cleared the level~`;

    if(utilityScript.isElementHidden(".levelPopUp")) {
        levelPopUp.classList.add("victoryPop");
        utilityScript.unhideElement(".levelPopUp");
        triggerLevelPopUp(0, 100);
    }
    else{
        levelPopUp.classList.add("victoryPop");
        levelPopUp.classList.remove("levelPop", "defeatPop");
    }
}

document.getElementsByClassName("controlButton")[2].onclick = function() { //defeat pop up
    document.getElementsByClassName("popUpText")[0].textContent = `Defeat...`;
    document.getElementsByClassName("popUpText")[1].textContent = `Better luck with rng next time`;

    if(utilityScript.isElementHidden(".levelPopUp")) {
        levelPopUp.classList.add("defeatPop");
        utilityScript.unhideElement(".levelPopUp");
        triggerLevelPopUp(0, 100);
    }
    else{
        levelPopUp.classList.add("defeatPop");
        levelPopUp.classList.remove("levelPop", "victoryPop");
    }
}

document.getElementsByClassName("controlButton")[3].onclick = function() { //level up pop up
    document.getElementsByClassName("popUpText")[0].textContent = `Level Up!`;
    document.getElementsByClassName("popUpText")[1].textContent = `Don't forget to use your stat points`;

    if(utilityScript.isElementHidden(".levelPopUp")) {
        levelPopUp.classList.add("levelPop");
        utilityScript.unhideElement(".levelPopUp");
        triggerLevelPopUp(0, 100);
    }
    else{
        levelPopUp.classList.add("levelPop");
        levelPopUp.classList.remove("defeatPop", "victoryPop");
    }
}

document.getElementsByClassName("controlButton")[4].onclick = function() { //toggle room insides visibility
    if (utilityScript.isElementHidden(".roomFillings")) {
        utilityScript.unhideElement(".roomFillings");
    } else {
        utilityScript.hideElement(".roomFillings");
    }
}

document.getElementsByClassName("controlButton")[5].onclick = function() { //show combat room elements
    if (utilityScript.isElementHidden(".combatRoom")) {
        utilityScript.hideMultipleElements(roomElementsExtars);
        utilityScript.unhideMultipleElements([".combatRoom", ".enemyElement"]);
        document.querySelector(".roomChest").src = `/assets/UI/chestClosed.png`;
    } else {
        utilityScript.hideMultipleElements(roomElementsExtars);
    }
}


document.getElementsByClassName("controlButton")[6].onclick = function() { //show trader room elements
    if (utilityScript.isElementHidden(".traderRoom")) {
        utilityScript.hideMultipleElements(roomElementsExtars);
        utilityScript.unhideMultipleElements([".traderRoom", ".nextRoomBtn"])
    } else {
        utilityScript.hideMultipleElements(roomElementsExtars);
    }
}

document.getElementsByClassName("controlButton")[7].onclick = function() { //show combat room after victory
    if (utilityScript.isElementHidden(".combatRoom")) {
        utilityScript.hideMultipleElements(roomElementsExtars);
        utilityScript.unhideMultipleElements([".combatRoom", ".nextRoomBtn"])
        document.querySelector(".roomChest").src = `/assets/UI/chestOpened.png`;
    } else {
        utilityScript.hideMultipleElements(roomElementsExtars);
    }
}

function triggerLevelPopUp(startWidth, endWidth) {
    const duration = 300; // ms
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1

        // Interpolate between start and end
        const currentWidth = startWidth + (endWidth - startWidth) * progress;
        levelPopUp.style.clipPath = `rect(0px ${currentWidth}% 100% 0px round 0%)`

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}