const HIDDEN_CLASS_NAME = "hidden";
import * as sidePanel from './sidePanel.js';
import * as playerClass from './playerClass.js';
import * as scriptGane from './scriptGame.js';

export function hideElement(elementClass) {
    document.querySelector(elementClass).classList.add(HIDDEN_CLASS_NAME);
}

export function unhideElement(elementClass) {
    document.querySelector(elementClass).classList.remove(HIDDEN_CLASS_NAME);
}

export function isElementHidden(elementClass) {
   return document.querySelector(elementClass).classList.contains(HIDDEN_CLASS_NAME);
}

export function hideMultipleElements(array) {
    for (let i = 0; i < array.length; i++) {
        hideElement(array[i]);
    }
}

export function unhideMultipleElements(array) {
    for (let i = 0; i < array.length; i++) {
        unhideElement(array[i]);
    }
}

const levelPopUp = document.querySelector(".levelPopUp");

function triggerLevelPopUp(startWidth, endWidth) {
    const duration = 300; // ms
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentWidth = startWidth + (endWidth - startWidth) * progress;
        levelPopUp.style.clipPath = `rect(0px ${currentWidth}% 100% 0px round 0%)`

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function clearPopUp() {
    triggerLevelPopUp(100, 0);

    setTimeout(() => {
        hideElement(".levelPopUp");
        levelPopUp.classList.remove("victoryPop", "levelPop", "defeatPop");
    }, 400);
}

function showLevelUpPopUp() { // New function for level-up pop-up with 5 second
    const popUpTexts = document.getElementsByClassName("popUpText");
    popUpTexts[0].textContent = `Level Up!`;
    popUpTexts[1].textContent = `Don't forget to use your stat points`;

    if (isElementHidden(".levelPopUp")) {
        levelPopUp.classList.add("levelPop");
        unhideElement(".levelPopUp");
        triggerLevelPopUp(0, 100);
    } else {
        levelPopUp.classList.add("levelPop");
        levelPopUp.classList.remove("defeatPop", "victoryPop");
    }

    setTimeout(() => {
        clearPopUp();
    }, 5000);
}

export {triggerLevelPopUp, clearPopUp, showLevelUpPopUp};
