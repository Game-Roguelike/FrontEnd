let isInventoryOpen = false;

document.getElementsByClassName("inventorySlot slotArrow")[0].onclick = function() {
    if(!isInventoryOpen){
        moveInventory("-", 85, 0, 0);
        isInventoryOpen = true;
        document.getElementsByClassName("blackoutPanel")[0].classList.remove("hidden")
    }
    else if(isInventoryOpen){
        moveInventory("+", 40, 180, 0.5);
        isInventoryOpen = false;
        setTimeout(()=> {
            document.getElementsByClassName("blackoutPanel")[0].classList.add("hidden");
        }, 400)
        
    }
}

function moveInventory(direction, startVh, startDeg, startOpacity) {
    const element = document.getElementsByClassName("playerInventory")[0];
    const endVh = direction === "+" ? startVh + 45 : startVh - 45;
    const duration = 300; // ms
    const startTime = performance.now();
    const endDeg =  direction === "+" ? startDeg + 180 : startDeg - 180;
    const endOpacity = direction === "+" ? startOpacity - 0.5 : startOpacity + 0.5;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1

        // Interpolate between start and end
        const currentVh = startVh + (endVh - startVh) * progress;
        element.style.top = `${currentVh}vh`;
        const currentDeg = startDeg + (endDeg - startDeg) * progress;
        document.getElementsByClassName("inventorySlot slotArrow")[0].style.rotate = `${currentDeg}deg`
        const currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;
        document.getElementsByClassName("blackoutPanel")[0].style.opacity = currentOpacity;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

const levelPopUp = document.getElementsByClassName("levelPopUp")[0];

//temporal bit till we get the game sequense going

document.getElementsByClassName("controlButton")[0].onclick = function() {
    triggerLevelPopUp(100, 0);
    
    setTimeout(()=> {
        levelPopUp.classList.add("hidden");
        levelPopUp.classList.remove("victoryPop");
        levelPopUp.classList.remove("levelPop");
        levelPopUp.classList.remove("defeatPop");
    }, 400)
    

}

document.getElementsByClassName("controlButton")[1].onclick = function() {
    document.getElementsByClassName("popUpText")[0].textContent = `Level Up!`;
    document.getElementsByClassName("popUpText")[1].textContent = `Don't forget to use your stat points`;

    if(levelPopUp.classList.contains("hidden")) {
        levelPopUp.classList.add("victoryPop");
        levelPopUp.classList.remove("hidden");
        triggerLevelPopUp(0, 100);
    }
    else{
        levelPopUp.classList.add("victoryPop");
        levelPopUp.classList.remove("levelPop");
        levelPopUp.classList.remove("defeatPop");
    }
}

document.getElementsByClassName("controlButton")[2].onclick = function() {
    document.getElementsByClassName("popUpText")[0].textContent = `Defeat...`;
    document.getElementsByClassName("popUpText")[1].textContent = `Better luck with rng next time`;

    if(levelPopUp.classList.contains("hidden")) {
        levelPopUp.classList.add("defeatPop");
        levelPopUp.classList.remove("hidden");
        triggerLevelPopUp(0, 100);
    }
    else{
        levelPopUp.classList.add("defeatPop");
        levelPopUp.classList.remove("levelPop");
        levelPopUp.classList.remove("victoryPop");
    }
}

document.getElementsByClassName("controlButton")[3].onclick = function() {
    document.getElementsByClassName("popUpText")[0].textContent = `Level Up!`;
    document.getElementsByClassName("popUpText")[1].textContent = `Don't forget to use your stat points`;

    if(levelPopUp.classList.contains("hidden")) {
        levelPopUp.classList.add("levelPop");
        levelPopUp.classList.remove("hidden");
        triggerLevelPopUp(0, 100);
    }
    else{
        levelPopUp.classList.add("levelPop");
        levelPopUp.classList.remove("defeatPop");
        levelPopUp.classList.remove("victoryPop");
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