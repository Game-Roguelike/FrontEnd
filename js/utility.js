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

const levelPopUp = document.querySelector(".levelPopUp");

function triggerPopUp(startWidth, endWidth, element) {
    const duration = 300; // ms
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentWidth = startWidth + (endWidth - startWidth) * progress;
        element.style.clipPath = `rect(0px ${currentWidth}% 100% 0px round 0%)`

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function clearPopUp(elementClass) {
    const element = document.querySelector(elementClass);
    triggerPopUp(100, 0, element);

    setTimeout(() => {
        hideElement(element);
        levelPopUp.classList.remove("victoryPop", "levelPop", "defeatPop");
    }, 400);
}

function showLevelUpPopUp(title, description, elementClass) { // New function for level-up pop-up with 5 second
    const element = document.querySelector(elementClass);
    const popUpTexts = document.getElementsByClassName("popUpText");

    popUpTexts[0].textContent = title;
    popUpTexts[1].textContent = description;

    unhideElement(elementClass);
    element.classList.add("levelPop");
    element.classList.remove("defeatPop", "victoryPop");

    triggerPopUp(0, 100, element);

    setTimeout(() => {
        clearPopUp(elementClass);
    }, 5000);
}

export {triggerPopUp, clearPopUp, showLevelUpPopUp};
