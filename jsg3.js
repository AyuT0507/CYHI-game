// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const gameAreaWidth = gameArea.clientWidth; // Get the width of the game area

    // --- Configuration ---
    const minHeight = 30;
    const minWidth = 40;
    const maxWidth = 180;
    
    // ⬇️ New configuration for pixel-based gaps
    const minPixelGap = 60;        // The minimum visual space between blocks in pixels
    const animationDuration = 5000;  // 5 seconds in milliseconds (must match CSS)
    const blockSpeed = (gameAreaWidth + maxWidth) / animationDuration; // pixels per millisecond

    let isGameOver = false;
    let lastBlockWidth = 0; // Stores the width of the most recently created block

    function createBlock() {
        if (isGameOver) return;

        const block = document.createElement('div');
        block.classList.add('block');

        // Set variable width
        const randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        block.style.width = `${randomWidth}px`;
        
        // This is crucial: update the global variable with this block's width
        // so the next block's delay can be calculated correctly.
        lastBlockWidth = randomWidth;

        // Set variable height based on position (logic is unchanged)
        if (Math.random() < 0.5) {
            // Top blocks (max 50% height)
            const maxHeight = gameArea.clientHeight * 0.50;
            block.style.height = `${Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight}px`;
            block.style.top = '0';
            block.style.borderBottomLeftRadius = '5px';
            block.style.borderBottomRightRadius = '5px';
        } else {
            // Bottom blocks (max 30% height)
            const maxHeight = gameArea.clientHeight * 0.30;
            block.style.height = `${Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight}px`;
            block.style.bottom = '0';
            block.style.borderTopLeftRadius = '5px';
            block.style.borderTopRightRadius = '5px';
        }

        gameArea.appendChild(block);
        block.addEventListener('click', stopGame);
        block.addEventListener('animationend', () => block.remove());
    }
    
    // The scheduler function is now smarter
    function generateNextBlock() {
        if (isGameOver) return;

        createBlock(); // Create a block first

        // Calculate the minimum time needed for the last block to travel
        // its own width PLUS the desired minimum gap.
        // Formula: Time = Distance / Speed
        const minTimeDelay = (lastBlockWidth + minPixelGap) / blockSpeed;
        
        // Add a little extra random time to vary the gaps slightly
        const extraRandomDelay = Math.random() * 300; // e.g., 0 to 0.3 seconds
        const nextBlockDelay = minTimeDelay + extraRandomDelay;
        
        setTimeout(generateNextBlock, nextBlockDelay);
    }

    function stopGame() {
        if (isGameOver) return;
        isGameOver = true;
        alert('Game Over!');
    }

    // Start the game
    generateNextBlock();
});