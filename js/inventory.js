let isInventoryOpen = false;

document.querySelector(".inventorySlot.slotArrow").onclick = function() {
    if (!isInventoryOpen) {
        moveInventory("-", 85, 0, 0);
        isInventoryOpen = true;
        document.querySelector(".blackoutPanel").classList.remove("hidden");
    } else if (isInventoryOpen) {
        moveInventory("+", 40, 180, 0.5);
        isInventoryOpen = false;
        setTimeout(() => {
            document.querySelector(".blackoutPanel").classList.add("hidden");
        }, 400)
    }
}

function moveInventory(direction, startVh, startDeg, startOpacity) {
    const element = document.querySelector(".playerInventory");
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
        document.querySelector(".inventorySlot.slotArrow").style.rotate = `${currentDeg}deg`
        const currentOpacity = startOpacity + (endOpacity - startOpacity) * progress;
        document.querySelector(".blackoutPanel").style.opacity = currentOpacity;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}