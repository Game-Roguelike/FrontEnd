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
    let paragraphs = document.querySelectorAll('.bigPopUp > p');

    paragraphs[0].textContent = textArray[0];
    paragraphs[1].textContent = textArray[1];
    paragraphs[2].textContent = textArray[2];

    unhideMultipleElements([".bigPopUp", ".blackoutPanel"])
    document.querySelector(".blackoutPanel").style.opacity = "50%";

    document.querySelectorAll(".bigPopButton")[1].onclick = function() {
        closeBigPopUp();
        clearInventoryHighlights();
    }

    if (item !== null) {
        unhideElement(".bigPopButton");
        document.querySelectorAll(".bigPopButton")[0].onclick = function() {
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

