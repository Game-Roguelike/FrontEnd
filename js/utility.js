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