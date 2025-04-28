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