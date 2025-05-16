import { useItem } from "./items.js";
import {clearInventoryHighlights} from "./inventory.js"

const HIDDEN_CLASS_NAME = "hidden";

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

export function showBigPopUp(textArray, item) {
    const paragraphs = document.querySelectorAll('.bigPopUp > p');

    for (let i = 0; i < paragraphs.length - 1; i++) {
        paragraphs[i].textContent = textArray[i];
    }

    unhideMultipleElements([".bigPopUp", ".blackoutPanel"])
    document.querySelector(".blackoutPanel").style.opacity = "50%";

    const buttons = document.querySelectorAll(".bigPopButton");

    buttons[1].onclick = function() {
        closeBigPopUp();
        clearInventoryHighlights();
    }

    if (item !== null) {
        unhideElement(".bigPopButton");
        buttons[0].onclick = function() {
            useItem(item);
            closeBigPopUp();
            clearInventoryHighlights();
        }
    }
}

function closeBigPopUp() {
    hideElement(".bigPopButton");
    hideMultipleElements([".bigPopUp", ".blackoutPanel"])
    document.querySelector(".blackoutPanel").style.opacity = "0%";
}

const levelPopUp = document.querySelector(".levelPopUp");

function triggerPopUp(startWidth, endWidth) {
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

function clearPopUp(elementClass) {
    triggerPopUp(100, 0);

    setTimeout(() => {
        hideElement(element);
        levelPopUp.classList.remove(elementClass);
    }, 400);
}

function showLevelUpPopUp(title, description, elementClass) {
    const popUpTexts = document.getElementsByClassName("popUpText");

    popUpTexts[0].textContent = title;
    popUpTexts[1].textContent = description;

    unhideElement(".levelPopUp");

    levelPopUp.classList.add(elementClass);

    triggerPopUp(0, 100);

    const autoCloseTimeout = setTimeout(() => {
        clearPopUp(elementClass);
        levelPopUp.removeEventListener("click", clickHandler);
    }, 5000);
    
    const clickHandler = () => {
        clearTimeout(autoCloseTimeout);
        clearPopUp(elementClass);
        levelPopUp.removeEventListener("click", clickHandler);
    };

    setTimeout(() => {
        levelPopUp.addEventListener("click", clickHandler);
    }, 100);
}

export {triggerPopUp, clearPopUp, showLevelUpPopUp};
