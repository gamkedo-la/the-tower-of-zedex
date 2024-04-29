// ================
// MODULE INTERFACE
// ================
// - inShopLevel() -> boolean
//   - Is the player in the shop level?
// - loadShopLevel() -> void
//   - Loads the shop level and spawns the three items on the ground, and populates the shop such that there
//     are three random items on the ground.
// - destroyShopItems() -> void
//   - If the player is in the shop level, replaces the item tiles with ground tiles, otherwise does
//     nothing. This function ought to be called when the player picks up an item.
// - exitShopLevel() -> void
//   - Cleans up the level, ought to be called when the player leaves the shop level.


// ================
// DEPENDENCIES
// ================

// ================
// DATA DEFINITIONS
// ================
// Should not be accessed by files other than this one.

const _shopItemsLength = 3;

// The tiles it contains ought to be item tiles only.
let _roomGridIdxWithItemTiles = [];

let _playerInShop = false;

// ================
// FUNCTIONS
// ================

// PRIVATE
// Returns an integer that is within the range of the given two integers, minimum (inclusive) and maximum
// (exclusive) respectively.
function getRandomIntInRange(min, max) {
	// From
	// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
	return Math.floor(Math.random() * (max - min)) + min;
}

// PRIVATE
// Converts the given item represented as an integer to its corresponding item tile.
// If the given item integer has no corresponding item tile, log the error and return the ground tile.
function intToItemTile(itemInt) {
	if (itemInt < -1 || itemInt > 5) {
		console.log("intToItemTile unrecognized item integer", itemInt);
		return TILE_GROUND;
	}
	const idxToTile = [TILE_GROUND, TILE_POTION, TILE_AMMO, TILE_KEY, TILE_MASTER_KEY, TILE_FREEZE_SCROLL];
	const out = idxToTile[itemInt];
	return out;
}

function inShopLevel() {
	return _playerInShop;
}

function loadShopLevel() {
	loadLevel(shopLevel);
	_playerInShop = true;

	// Choose 3 different integers randomly from the inclusive range of 1 to 5.
	let allItems = [1, 2, 3, 4, 5];
	let itemsToOffer = [];

	for (let i = 0; i < _shopItemsLength; i++) {
		// Move a random item from allItems into itemsToOffer
		const randomIdx = getRandomIntInRange(0, allItems.length);
		itemsToOffer.push(allItems[randomIdx]);
		allItems.splice(randomIdx, 1);
	}

	// Put the itemsToOffer onto the ground, vertically at the center, and horizontally equidistant to one
	// another
	const rowPos = Math.floor(ROOM_ROWS / 2);
	const horizontalDistance = Math.floor(ROOM_COLS / 4);

	_roomGridIdxWithItemTiles = [];
	for (let i = 0; i < itemsToOffer.length; i++) {
		const itemInt = itemsToOffer[i];
		const colPos = horizontalDistance + (i * horizontalDistance);
		const roomGridIdx = rowPos * ROOM_COLS + colPos;
		roomGrid[roomGridIdx] = intToItemTile(itemInt);
		_roomGridIdxWithItemTiles.push(roomGridIdx);
	}
	movePlayerToBottom();
	showShopMessage = true;
}

function destroyShopItems() {
	showShopMessage = false;
	// The player would have turned one of the item tiles to a ground already, and this function would
	// turn that item tile to a ground tile again
	for (let i = 0; i < _roomGridIdxWithItemTiles.length; i++) {
		const idx = _roomGridIdxWithItemTiles[i];
		roomGrid[idx] = TILE_GROUND;
	}
	_roomGridIdxWithItemTiles = []; // Unnecessary, but better safe than sorry
}

function exitShopLevel() {
	_playerInShop = false;
}


