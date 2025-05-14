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

levelPopUp.addEventListener("click", () => {
    clearPopUp();
});

function showLevelUpPopUp(title, description, elementClass) { // New function for level-up pop-up with 5 second
    const popUpTexts = document.getElementsByClassName("popUpText");

    popUpTexts[0].textContent = title;
    popUpTexts[1].textContent = description;

    unhideElement(".levelPopUp");

    levelPopUp.classList.remove("defeatPop", "victoryPop");
    levelPopUp.classList.add(elementClass);

    triggerPopUp(0, 100);

    setTimeout(() => {
        clearPopUp(elementClass);
    }, 5000);
}

export {triggerPopUp, clearPopUp, showLevelUpPopUp};
