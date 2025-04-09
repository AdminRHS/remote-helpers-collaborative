// Game state
const gameState = {
    player: {
        x: 1,
        y: 1,
        hp: 100,
        maxHp: 100,
        xp: 0,
        xpToNextLevel: 100,
        level: 1,
        inventory: [],
        stars: 0,
        totalStars: 0
    },
    map: [],
    terrain: [],
    knowledge: [],
    obstacles: [
        { x: 4, y: 1, type: 'river', requires: 'magic-boat', name: 'Deep River', description: 'A magical boat can help you cross this river' },
        { x: 7, y: 3, type: 'mountain', requires: 'climbing-gear', name: 'High Mountain', description: 'Special climbing gear will help you scale this mountain' },
        { x: 3, y: 7, type: 'forest', requires: 'forest-medallion', name: 'Enchanted Forest', description: 'A forest medallion will guide you through this magical forest' }
    ],
    scrolls: [
        { 
            x: 2, y: 1, 
            title: 'Company Values', 
            content: 'Our core values define who we are: 1. Innovation - We embrace new ideas and technologies. 2. Integrity - We always do what is right. 3. Teamwork - We achieve more together. 4. Excellence - We strive for the highest quality in everything we do.',
            unlocks: 'values-test'
        },
        { 
            x: 5, y: 2, 
            title: 'Safety Protocols', 
            content: 'Safety is our top priority. Key protocols: 1. Always wear proper safety equipment. 2. Report any incidents immediately. 3. Follow emergency procedures. 4. Maintain clean workspace.',
            unlocks: 'safety-test'
        },
        { 
            x: 8, y: 4, 
            title: 'Customer Service', 
            content: 'Exceptional customer service principles: 1. Listen actively to customer needs. 2. Respond promptly and professionally. 3. Take ownership of issues. 4. Follow up to ensure satisfaction.',
            unlocks: 'service-test'
        }
    ],
    chests: [
        { x: 4, y: 1, stars: 1, requires: 'magic-boat', description: 'Use the Magic Boat to reach this chest' },
        { x: 7, y: 3, stars: 1, requires: 'climbing-gear', description: 'Use the Climbing Gear to reach this chest' },
        { x: 3, y: 7, stars: 1, requires: 'forest-medallion', description: 'Use the Forest Medallion to reach this chest' }
    ],
    enemies: [
        { 
            x: 3, y: 2,
            id: 'values-test',
            question: 'Which of these is NOT one of our core values?', 
            options: ['Innovation', 'Profit', 'Integrity', 'Teamwork'], 
            answer: 1,
            reward: 'magic-boat',
            rewardName: 'Magic Boat',
            rewardDescription: 'A mystical boat that can safely navigate any water',
            attempts: 0,
            maxAttempts: 3,
            requires: 'Company Values'
        },
        { 
            x: 6, y: 2,
            id: 'safety-test',
            question: 'What should you do first when encountering a workplace incident?', 
            options: ['Ignore it', 'Report it immediately', 'Wait and see', 'Handle it yourself'], 
            answer: 1,
            reward: 'climbing-gear',
            rewardName: 'Climbing Gear',
            rewardDescription: 'Professional equipment for scaling mountains safely',
            attempts: 0,
            maxAttempts: 3,
            requires: 'Safety Protocols'
        },
        { 
            x: 8, y: 5,
            id: 'service-test',
            question: 'What is the first step in providing excellent customer service?', 
            options: ['Solve the problem quickly', 'Listen actively', 'Give a refund', 'Escalate to manager'], 
            answer: 1,
            reward: 'forest-medallion',
            rewardName: 'Forest Medallion',
            rewardDescription: 'An ancient medallion that guides you through enchanted forests',
            attempts: 0,
            maxAttempts: 3,
            requires: 'Customer Service'
        }
    ],
    portal: {
        x: 8,
        y: 8,
        requiredStars: 3,
        name: 'Victory Portal',
        description: 'Collect 3 stars to activate the portal and complete your training'
    },
    gameSize: 10,
    currentTest: null
};

// Terrain types
const terrainTypes = [
    'grass', 'grass', 'grass', 'grass', 'grass', 
    'dirt', 'dirt', 'sand', 'forest', 'rock'
];

// Initialize game
function initGame() {
    // Create base terrain (all grass)
    gameState.terrain = Array(gameState.gameSize).fill().map(() => 
        Array(gameState.gameSize).fill('grass')
    );
    
    // Add event listener for help button
    document.getElementById('help-button').addEventListener('click', showInstructionsModal);
    
    // Add decorative elements
    const decorativeForest = [
        [0, 0], [0, 2], [0, 4], [0, 6], [0, 8],
        [9, 0], [9, 2], [9, 4], [9, 6], [9, 8],
        [2, 0], [4, 0], [6, 0], [8, 0],
        [2, 9], [4, 9], [6, 9], [8, 9],
        // Forest area around the third chest
        [2, 6], [2, 7], [2, 8],
        [3, 6], [3, 7], [3, 8],
        [4, 6], [4, 7], [4, 8]
    ];
    
    decorativeForest.forEach(([x, y]) => {
        gameState.terrain[y][x] = 'forest';
    });
    
    // Add mountains to create paths and barriers
    const mountains = [
        [5, 0], [5, 1], [5, 3], [5, 4],
        [7, 2], [7, 3], [7, 4],
        [2, 4], [3, 4], [4, 4],
        [7, 3] // Add mountain for the Climbing Gear chest
    ];
    
    mountains.forEach(([x, y]) => {
        gameState.terrain[y][x] = 'mountain';
    });
    
    // Add rivers
    for (let x = 3; x < 7; x++) {
        gameState.terrain[1][x] = 'water';
    }
    
    // Create empty object map
    gameState.map = Array(gameState.gameSize).fill().map(() => Array(gameState.gameSize).fill('empty'));
    
    // Place player at starting position
    gameState.player.x = 1;
    gameState.player.y = 1;
    gameState.map[1][1] = 'player';
    
    // Calculate total stars
    gameState.player.totalStars = gameState.chests.reduce((sum, chest) => sum + chest.stars, 0);
    
    // Place all game elements
    gameState.scrolls.forEach(scroll => {
        gameState.map[scroll.y][scroll.x] = 'scroll';
    });
    
    gameState.enemies.forEach(enemy => {
        gameState.map[enemy.y][enemy.x] = 'enemy';
    });
    
    gameState.chests.forEach(chest => {
        gameState.map[chest.y][chest.x] = 'chest';
    });
    
    // Place portal
    gameState.map[gameState.portal.y][gameState.portal.x] = 'portal';
    
    // Update stars display
    document.getElementById('stars').textContent = `Stars: ${gameState.player.stars}/${gameState.player.totalStars}`;
    
    // Render game board
    renderGameBoard();
    updateStatus();
}

// Render game board
function renderGameBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
    for (let y = 0; y < gameState.gameSize; y++) {
        for (let x = 0; x < gameState.gameSize; x++) {
            const tile = document.createElement('div');
            tile.className = `game-tile ${gameState.terrain[y][x]}`;
            
            // Add terrain features
            if (gameState.terrain[y][x] === 'forest' && gameState.map[y][x] !== 'enemy' && gameState.map[y][x] !== 'chest') {
                const tree = document.createElement('div');
                tree.className = 'tree';
                tile.appendChild(tree);
            }
            
            if (gameState.terrain[y][x] === 'rock' && gameState.map[y][x] !== 'enemy' && gameState.map[y][x] !== 'chest') {
                const rock = document.createElement('div');
                rock.className = 'rock-obstacle';
                tile.appendChild(rock);
            }
            
            // Add objects
            switch (gameState.map[y][x]) {
                case 'player':
                    const player = document.createElement('div');
                    player.className = 'player';
                    player.innerHTML = '🧙‍♂️';
                    tile.appendChild(player);
                    break;
                case 'scroll':
                    const scroll = document.createElement('div');
                    scroll.className = 'scroll';
                    scroll.innerHTML = '<i class="fas fa-scroll"></i>';
                    tile.appendChild(scroll);
                    break;
                case 'chest':
                    const chest = document.createElement('div');
                    chest.className = 'chest';
                    chest.innerHTML = '<i class="fas fa-chest"></i>';
                    tile.appendChild(chest);
                    break;
                case 'enemy':
                    const enemy = document.createElement('div');
                    enemy.className = 'enemy';
                    enemy.innerHTML = '<i class="fas fa-skull"></i>';
                    tile.appendChild(enemy);
                    break;
                case 'portal':
                    const portal = document.createElement('div');
                    portal.className = 'portal';
                    tile.appendChild(portal);
                    break;
            }
            
            board.appendChild(tile);
        }
    }
}

// Check if player can move to new position
function canMoveTo(x, y) {
    // Check terrain
    const terrain = gameState.terrain[y][x];
    if (terrain === 'mountain' || terrain === 'water' || terrain === 'forest') {
        // Check if player has the required item for this type of terrain
        const requiredItem = terrain === 'water' ? 'magic-boat' : 
                           terrain === 'mountain' ? 'climbing-gear' : 
                           'forest-medallion';
        const hasItem = gameState.player.inventory.includes(requiredItem);
        if (!hasItem) {
            if (terrain === 'water') {
                alert("You need a Magic Boat to cross water!");
            } else if (terrain === 'mountain') {
                alert("You need Climbing Gear to climb mountains!");
            } else if (terrain === 'forest') {
                alert("You need a Forest Medallion to enter the forest!");
            }
        }
        return hasItem;
    }
    return true;
}

// Move player with terrain check
function movePlayer(direction) {
    let newX = gameState.player.x;
    let newY = gameState.player.y;
    
    // Store old position for reverting if needed
    const oldX = gameState.player.x;
    const oldY = gameState.player.y;
    
    switch (direction) {
        case 'up':
            if (newY > 0) {
                newY--;
            }
            break;
        case 'down':
            if (newY < gameState.gameSize - 1) {
                newY++;
            }
            break;
        case 'left':
            if (newX > 0) {
                newX--;
            }
            break;
        case 'right':
            if (newX < gameState.gameSize - 1) {
                newX++;
            }
            break;
    }
    
    // Check if new position is different and movement is allowed
    if ((newX !== gameState.player.x || newY !== gameState.player.y) && canMoveTo(newX, newY)) {
        // Check for chest and required item before moving
        const chest = gameState.chests.find(c => c.x === newX && c.y === newY);
        if (chest && !gameState.player.inventory.includes(chest.requires)) {
            alert(`You need a ${getItemName(chest.requires)} to collect this chest!`);
            return;
        }

        // Clear old position
        gameState.map[oldY][oldX] = 'empty';
        
        // Update player position
        gameState.player.x = newX;
        gameState.player.y = newY;
        
        // Check what's at the new position
        const cellContent = gameState.map[newY][newX];
        
        switch (cellContent) {
            case 'scroll':
                collectScroll(newX, newY);
                break;
            case 'enemy':
                const enemy = gameState.enemies.find(e => e.x === newX && e.y === newY);
                if (enemy) {
                    const hasKnowledge = gameState.knowledge.some(k => k.title === enemy.requires);
                    if (!hasKnowledge) {
                        alert(`You need to study ${enemy.requires} before taking this test!`);
                        // Return player to previous position
                        gameState.player.x = oldX;
                        gameState.player.y = oldY;
                        gameState.map[oldY][oldX] = 'player';
                        return;
                    }
                    startTest(newX, newY);
                }
                break;
            case 'chest':
                openChest(newX, newY);
                break;
            case 'portal':
                if (gameState.player.stars >= gameState.portal.requiredStars) {
                    showVictoryModal();
                } else {
                    alert(`You need ${gameState.portal.requiredStars} stars to activate the portal! (Current: ${gameState.player.stars})`);
                    // Return player to previous position
                    gameState.player.x = oldX;
                    gameState.player.y = oldY;
                    gameState.map[oldY][oldX] = 'player';
                }
                break;
            default:
                gameState.map[newY][newX] = 'player';
        }
        
        renderGameBoard();
    }
}

// Collect scroll
function collectScroll(x, y) {
    const scroll = gameState.scrolls.find(s => s.x === x && s.y === y);
    if (scroll) {
        // Add knowledge
        if (!gameState.knowledge.some(k => k.title === scroll.title)) {
            gameState.knowledge.push({
                title: scroll.title,
                content: scroll.content
            });
            
            // Add XP
            gameState.player.xp += 30;
            
            // Update game state
            gameState.map[y][x] = 'player';
            updateStatus();
            updateKnowledgeJournal();
            
            // Show knowledge modal
            showKnowledgeModal(scroll.title, scroll.content);
        }
    }
}

// Open chest
function openChest(x, y) {
    const chest = gameState.chests.find(c => c.x === x && c.y === y);
    if (chest) {
        // Add stars
        gameState.player.stars += chest.stars;
        
        // Add XP
        gameState.player.xp += 50;
        
        // Update game state
        gameState.map[y][x] = 'player';
        updateStatus();
        
        // Show message
        alert(`You found ${chest.stars} stars! (${gameState.player.stars}/${gameState.player.totalStars} total)`);
    }
}

// Start test
function startTest(x, y) {
    const enemy = gameState.enemies.find(e => e.x === x && e.y === y);
    if (enemy) {
        gameState.currentTest = enemy;
        
        // Show test modal
        const modal = document.getElementById('test-modal');
        const question = document.getElementById('test-question');
        const options = document.getElementById('test-options');
        const feedback = document.getElementById('test-feedback');
        const continueBtn = document.getElementById('test-continue');
        
        question.textContent = enemy.name;
        options.innerHTML = '';
        feedback.className = 'hidden';
        continueBtn.className = 'hidden';
        
        enemy.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-left px-4 text-white border border-gray-600';
            btn.textContent = option;
            btn.onclick = () => checkAnswer(index);
            options.appendChild(btn);
        });
        
        modal.classList.remove('hidden');
    }
}

// Check test answer
function checkAnswer(answerIndex) {
    const feedback = document.getElementById('test-feedback');
    const continueBtn = document.getElementById('test-continue');
    const options = document.getElementById('test-options');
    
    gameState.currentTest.attempts++;
    
    if (answerIndex === gameState.currentTest.answer) {
        // Correct answer
        feedback.className = 'bg-green-900 text-green-200 p-3 rounded mb-4';
        feedback.textContent = `Correct! You received a ${gameState.currentTest.rewardName} and gained 50 XP!`;
        
        // Add XP
        gameState.player.xp += 50;
        
        // Remove enemy from map
        gameState.map[gameState.currentTest.y][gameState.currentTest.x] = 'empty';
        
        // Add reward item
        if (!gameState.player.inventory.includes(gameState.currentTest.reward)) {
            gameState.player.inventory.push(gameState.currentTest.reward);
            updateInventory();
        }
        
        // Disable options and highlight correct answer
        Array.from(options.children).forEach((btn, index) => {
            btn.disabled = true;
            if (index === answerIndex) {
                btn.className = 'w-full bg-green-800 py-2 rounded text-left px-4 text-white border border-green-600 cursor-not-allowed';
            } else {
                btn.className = 'w-full bg-gray-700 py-2 rounded text-left px-4 text-gray-400 border border-gray-600 cursor-not-allowed';
            }
        });
        
        // Show continue button with proper styling
        continueBtn.className = 'w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer';
    } else {
        // Wrong answer
        feedback.className = 'bg-red-900 text-red-200 p-3 rounded mb-4';
        
        if (gameState.currentTest.attempts >= gameState.currentTest.maxAttempts) {
            feedback.textContent = 'You have failed the test! You must study more and try again later.';
            gameState.player.hp -= 15;
            
            // Reset attempts
            gameState.currentTest.attempts = 0;
            
            // Check for game over
            if (gameState.player.hp <= 0) {
                gameState.player.hp = 0;
                showGameOverModal();
            }
            
            // Disable options and highlight wrong answers
            Array.from(options.children).forEach((btn, index) => {
                btn.disabled = true;
                if (index === answerIndex) {
                    btn.className = 'w-full bg-red-800 py-2 rounded text-left px-4 text-white border border-red-600 cursor-not-allowed';
                } else if (index === gameState.currentTest.answer) {
                    btn.className = 'w-full bg-green-800 py-2 rounded text-left px-4 text-white border border-green-600 cursor-not-allowed';
                } else {
                    btn.className = 'w-full bg-gray-700 py-2 rounded text-left px-4 text-gray-400 border border-gray-600 cursor-not-allowed';
                }
            });
            
            // Show continue button with proper styling
            continueBtn.className = 'w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer';
        } else {
            feedback.textContent = `Wrong answer! You have ${gameState.currentTest.maxAttempts - gameState.currentTest.attempts} attempts remaining.`;
            gameState.player.hp -= 5;
            
            // Highlight wrong answer but keep others active
            Array.from(options.children).forEach((btn, index) => {
                if (index === answerIndex) {
                    btn.className = 'w-full bg-red-800 py-2 rounded text-left px-4 text-white border border-red-600';
                }
            });
            
            // Don't show continue button yet
            continueBtn.classList.add('hidden');
            return;
        }
    }
    
    feedback.classList.remove('hidden');
    continueBtn.classList.remove('hidden');
    updateStatus();
}

// Continue after test
function continueAfterTest() {
    const modal = document.getElementById('test-modal');
    modal.classList.add('hidden');
    
    // Update player position
    gameState.map[gameState.player.y][gameState.player.x] = 'player';
    renderGameBoard();
}

// Show knowledge modal
function showKnowledgeModal(title, content) {
    const modal = document.getElementById('knowledge-modal');
    const titleElement = document.getElementById('knowledge-title');
    const contentElement = document.getElementById('knowledge-content');
    
    titleElement.textContent = title;
    
    // Format numbered lists in content
    content = content.replace(/(\d+\.\s)/g, '\n$1');
    contentElement.innerHTML = content.split('\n').map(line => `<p>${line}</p>`).join('');
    
    modal.classList.remove('hidden');
}

// Close knowledge modal
function closeKnowledgeModal() {
    const modal = document.getElementById('knowledge-modal');
    modal.classList.add('hidden');
}

// Show game over modal
function showGameOverModal() {
    const modal = document.getElementById('gameover-modal');
    modal.classList.remove('hidden');
}

// Show victory modal
function showVictoryModal() {
    const modal = document.getElementById('victory-modal');
    const finalLevel = document.getElementById('final-level');
    
    // Add fireworks
    const fireworks = document.createElement('div');
    fireworks.className = 'fireworks';
    modal.appendChild(fireworks);
    
    finalLevel.textContent = gameState.player.level;
    modal.classList.remove('hidden');
}

// Reset game
function resetGame() {
    // Hide all modals
    document.getElementById('knowledge-modal').classList.add('hidden');
    document.getElementById('test-modal').classList.add('hidden');
    document.getElementById('gameover-modal').classList.add('hidden');
    document.getElementById('victory-modal').classList.add('hidden');
    
    // Reset player state
    gameState.player = {
        x: 1,
        y: 1,
        hp: 100,
        maxHp: 100,
        xp: 0,
        xpToNextLevel: 100,
        level: 1,
        inventory: [],
        stars: 0,
        totalStars: 0
    };
    
    gameState.knowledge = [];
    
    // Reinitialize game
    initGame();
    updateKnowledgeJournal();
    updateInventory();
}

// Update status display
function updateStatus() {
    // Check for level up
    while (gameState.player.xp >= gameState.player.xpToNextLevel) {
        gameState.player.xp -= gameState.player.xpToNextLevel;
        gameState.player.level++;
        gameState.player.xpToNextLevel = Math.floor(gameState.player.xpToNextLevel * 1.2);
        gameState.player.maxHp += 20;
        gameState.player.hp = gameState.player.maxHp;
    }
    
    // Update HP display
    const hpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    document.getElementById('hp-bar').style.width = `${hpPercent}%`;
    document.getElementById('hp-text').textContent = `${gameState.player.hp}/${gameState.player.maxHp}`;
    
    // Update XP display
    const xpPercent = (gameState.player.xp / gameState.player.xpToNextLevel) * 100;
    document.getElementById('xp-bar').style.width = `${xpPercent}%`;
    document.getElementById('xp-text').textContent = `${gameState.player.xp}/${gameState.player.xpToNextLevel}`;
    
    // Update level and stars
    document.getElementById('level').textContent = gameState.player.level;
    document.getElementById('stars').textContent = `Stars: ${gameState.player.stars}/${gameState.player.totalStars}`;
}

// Update knowledge journal
function updateKnowledgeJournal() {
    const journal = document.getElementById('knowledge-journal');
    journal.innerHTML = '';
    
    gameState.knowledge.forEach((item, index) => {
        const knowledgeItem = document.createElement('div');
        knowledgeItem.className = 'knowledge-item';
        
        const bookIcon = document.createElement('div');
        bookIcon.className = 'book-icon';
        
        const topicTitle = document.createElement('div');
        topicTitle.className = 'topic-title';
        topicTitle.textContent = item.title;
        
        knowledgeItem.appendChild(bookIcon);
        knowledgeItem.appendChild(topicTitle);
        
        // Add click handler to show modal
        knowledgeItem.addEventListener('click', () => {
            showKnowledgeModal(item.title, item.content);
        });
        
        journal.appendChild(knowledgeItem);
    });
}

// Update inventory with tooltips
function updateInventory() {
    const inventory = document.getElementById('inventory');
    
    if (gameState.player.inventory.length === 0) {
        inventory.innerHTML = '<div class="text-gray-400 italic">Your items will appear here...</div>';
    } else {
        inventory.innerHTML = '';
        gameState.player.inventory.forEach(item => {
            const div = document.createElement('div');
            div.className = 'inventory-item bg-gray-700 p-2 rounded-lg flex items-center cursor-help';
            
            // Find the enemy that gives this reward to get the description
            const itemSource = gameState.enemies.find(e => e.reward === item);
            if (itemSource) {
                div.title = itemSource.rewardDescription;
            }
            
            let icon = '';
            switch (item) {
                case 'magic-boat':
                    icon = '<i class="fas fa-ship text-blue-400 mr-2"></i>';
                    break;
                case 'climbing-gear':
                    icon = '<i class="fas fa-mountain text-gray-300 mr-2"></i>';
                    break;
                case 'forest-medallion':
                    icon = '<i class="fas fa-circle text-green-500 mr-2"></i>';
                    break;
            }
            
            div.innerHTML = `${icon}<span class="text-xs font-bold text-white">${getItemName(item)}</span>`;
            inventory.appendChild(div);
        });
    }
}

// Get item name for display
function getItemName(itemId) {
    const names = {
        'magic-boat': 'Magic Boat',
        'climbing-gear': 'Climbing Gear',
        'forest-medallion': 'Forest Medallion'
    };
    return names[itemId] || itemId;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer('up');
            break;
        case 'ArrowDown':
            movePlayer('down');
            break;
        case 'ArrowLeft':
            movePlayer('left');
            break;
        case 'ArrowRight':
            movePlayer('right');
            break;
    }
});

// Show instructions modal
function showInstructionsModal() {
    document.getElementById('instructions-modal').classList.remove('hidden');
}

// Close instructions modal
function closeInstructionsModal() {
    document.getElementById('instructions-modal').classList.add('hidden');
}

// Add keyboard event listener for closing modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeInstructionsModal();
    }
});

// Initialize game on load
window.onload = initGame; 