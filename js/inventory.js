import * as utilityScript from './utility.js';

let isInventoryOpen = false;
const panel = document.querySelector(".blackoutPanel");

document.querySelector(".inventorySlot.slotArrow").onclick = function() {
    if (!isInventoryOpen) {
        moveInventory("-", 85, 0, 0);
        isInventoryOpen = true;
        utilityScript.unhideElement(panel)
    } else {
        moveInventory("+", 40, 180, 0.5);
        isInventoryOpen = false;
        setTimeout(() => utilityScript.hideElement(panel), 400);
    }
}

function moveInventory(direction, startVh, startDeg, startOpacity) {
    const duration = 300; // ms
    const startTime = performance.now();

    const endVh = direction === "+" ? startVh + 45 : startVh - 45;
    const endDeg =  direction === "+" ? startDeg + 180 : startDeg - 180;
    const endOpacity = direction === "+" ? startOpacity - 0.5 : startOpacity + 0.5;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1

        // Interpolate between start and end
        const currentVh = startVh + (endVh - startVh) * progress;
        const currentDeg = startDeg + (endDeg - startDeg) * progress;
        const currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;

        document.querySelector(".playerInventory").style.top = `${currentVh}vh`;
        document.querySelector(".inventorySlot.slotArrow").style.rotate = `${currentDeg}deg`;
        panel.style.opacity = currentOpacity;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}