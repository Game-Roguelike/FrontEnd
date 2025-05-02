const HIDDEN_CLASS_NAME = "hidden";

export function hideElement(elem) {
    elem.classList.add(HIDDEN_CLASS_NAME);
}

export function unhideElement(elem) {
    elem.classList.remove(HIDDEN_CLASS_NAME);
}

export function isElementHidden(elem) {
   return elem.classList.contains(HIDDEN_CLASS_NAME);
}

export function hidingRoomElements() {
    hideElement(document.querySelector(".traderRoom"));
    hideElement(document.querySelector(".nextRoomBtn"));
    hideElement(document.querySelector(".combatRoom"));
    hideElement(document.querySelector(".enemyElement"));
}