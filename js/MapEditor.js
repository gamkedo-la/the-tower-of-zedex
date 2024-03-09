// ================
// MODULE INTERFACE 
// ================

// - setupTileButtons()
//   - Initializes the tile buttons that are to be displayed in the editor, only to be called once at the
//   - start of the game launch.
// - loadLevelEditor()
//   - Unhides the tile buttons, cleans the map, and activates tile brush feature.
// - closeLevelEditor()
//   - Hides the tile buttons, and deactivates the the tile brush feature.
// - inEditorPlayMode()
//   - Did the player click the "Play Level" button of the editor and is in that mode?
// - playLevelInEditor()
//   - Simulates a level with the map that the player has built from the editor.
// - quitLevelInEditor()
//   - Turns off the level editor's map simulation.

/*
	-draw the a blank tiled map
	-create image-buttons for each different tile
	-image-button stores Tile_id
	-click on blank map tiles to store value of tile at map-index
        -click on "Play Level" to try out the level in-game, and "Stop Level" to stop that
           -be sure to add the player tile to be able to control someone (add only one)
           -any tiles added during editor play mode WILL NOT be saved
	-refresh map
	-when done editing a map, click --"CREATE MAP DATA"-- to display "text version" of Map data.
	-create more
	-when done editing, click --"Return To Title Screen"-- to leave Editor Mode
*/

var _el_editorModeContainer = document.querySelector("#editor-mode");
_el_editorModeContainer.style.display = "none";

var _cleanMap =  [ 
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  
        20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 
    ];

let _storedTileValue = -1;
let _editorLevelPrePlay = [];
let _inEditorPlayMode = false;

function setStoredTileValue(val) {
    _storedTileValue = val;
    console.log(_storedTileValue)

    return _storedTileValue;
}

var _imageList = [
// {varName: warriorPic, theFile: "warrior.png"},

    {varName:playerFacingDown, theFile:"warrior_down.png"},
	{varName:playerFacingLeft, theFile:"warrior_left.png"},
	{varName:playerFacingRight, theFile:"warrior_right.png"},
	{varName:playerFacingUp, theFile:"warrior_up.png"},
	{varName:playerSprites, theFile:"playerSpriteSheet.png"},
	{varName:healthIcon, theFile:"health_icon.png"},
	{varName:boomstickIcon, theFile:"boomstick_icon.png"},
	// {varName:swordIcon, theFile:"sword_icon.png"},
	// {varName:pickupIcons, theFile:"pickupIcons.png"},
	// {varName:zombieSprites, theFile:"zombieSprites.png"},
        {tileType:TILE_PLAYER,          theFile:"images/warrior_down.png",          tileValue: 2 },
	{tileType:TILE_GROUND,          theFile:"images/world_ground.png",          tileValue: 0 },
	{tileType:TILE_WALL,            theFile:"images/world_wall.png",            tileValue: 1 },
	{tileType:TILE_GOAL,           theFile:"images/world_stairs.png",           tileValue: 3 },
	{tileType:TILE_KEY,             theFile:"images/pickup_key.png",            tileValue: 4 },
	{tileType:TILE_DOOR,            theFile:"images/world_door.png",            tileValue: 5 },
	{tileType:TILE_SPIKE,           theFile:"images/world_spike.png",           tileValue: 6 },
    {tileType:TILE_MASTER_KEY,      theFile:"images/pickup_masterKey.png",      tileValue: 7 },
    {tileType:TILE_AMMO,            theFile:"images/pickup_ammo.png",           tileValue: 8 },
    {tileType:TILE_POTION,          theFile:"images/pickup_potion.png",         tileValue: 9 },
	{tileType:TILE_CHEST,          theFile:"images/chest.png",                  tileValue: 10 },
	{tileType:TILE_FREEZE_SCROLL,  theFile:"images/pickup_spell_scroll.png",    tileValue: 12 },
	
	{tileType:TILE_CRYPT_WALL1,     theFile:"images/crypt_wall1.png",           tileValue: 20 },
	{tileType:TILE_CRYPT_WALL2,     theFile:"images/crypt_wall2.png",           tileValue: 21 },
	{tileType:TILE_CRYPT_WALL3,     theFile:"images/crypt_wall3.png",           tileValue: 22 },
	{tileType:TILE_CRYPT_DAMAGE_FLOOR, theFile:"images/crypt_damageFloor.png",  tileValue: 23 },

    //Row 1: GardenSpriteSheet
    {tileType: TILE_GARDEN_WALL1,               tileValue: 30,    theFile: "images/MapEditorSpecific/gardenWall1.png"},
    {tileType: TILE_GARDEN_WALL2,     			tileValue: 31,    theFile: "images/MapEditorSpecific/gardenWall2.png"},
    {tileType: TILE_GARDEN_WALL3,               tileValue: 32,    theFile: "images/MapEditorSpecific/gardenWall3.png"},
    {tileType: TILE_GRASS,       				tileValue: 33,    theFile: "images/MapEditorSpecific/grass.png"},
    {tileType: TILE_BUSH_TOP,      				tileValue: 34,    theFile: "images/MapEditorSpecific/bush-top.png"},
    {tileType: TILE_BUSH_BOTTOM,       			tileValue: 35,    theFile: "images/MapEditorSpecific/bush-bottom.png"},
    //OPEN
    //OPEN
    {tileType: TILE_GARDEN_WATER1,         		tileValue: 38,    theFile: "images/MapEditorSpecific/water.png"},
    

    //Row 2: 
    {tileType: TILE_TREE_TOPLEFT,          	tileValue: 40,    theFile: "images/MapEditorSpecific/tree-topLeft.png"},
    {tileType: TILE_TREE_TOPRIGHT,         	tileValue: 41,    theFile: "images/MapEditorSpecific/tree-topRight.png"},
    {tileType: TILE_TREE_MIDLEFT,          	tileValue: 42,    theFile: "images/MapEditorSpecific/tree-midLeft.png"},
    {tileType: TILE_TREE_MIDRIGHT,       	tileValue: 43,    theFile: "images/MapEditorSpecific/tree-midRight.png"},
    {tileType: TILE_TREE_BOTLEFT,       	tileValue: 44,    theFile: "images/MapEditorSpecific/tree-botLeft.png"},
    {tileType: TILE_TREE_BOTRIGHT,       	tileValue: 45,    theFile: "images/MapEditorSpecific/tree-botRight.png"},

    //Enemies
    {tileType: TILE_GHOST, tileValue: 60, theFile: "images/ghostSprite_1.png"},
    {tileType: TILE_ZOMBIE, tileValue: 61, theFile: "images/zombieSprite_1.png"},
    {tileType: TILE_WALL_HUGGER, tileValue: 62, theFile: "images/wall_hugger_1.png"},
    {tileType: TILE_TURRET, tileValue: 63, theFile: "images/turret_sprite_1.png"},
    //OPEN
    //OPEN
    //OPEN
    //OPEN
];


function setupTileButtons() {
    let tileButtonContainer = document.getElementById('editor-mode');
    let htmlString = "";
    let i;
    for(i=7; i<_imageList.length; i++) {
        htmlString += `<input id=${_imageList[i].tileValue} type='image' src=${_imageList[i].theFile} onClick="setStoredTileValue(${_imageList[i].tileValue})"></input> `;
    } // end of Loop

    tileButtonContainer.innerHTML += htmlString;

    // Creates the Generate Level Button
    let btn = document.createElement('button');
    btn.innerHTML = 'Generate Level Data';
    btn.addEventListener('click', _generateReadableMapData);
    tileButtonContainer.appendChild(btn);

    // Creates the Generate Garden Walls Button
    let garden_btn = document.createElement('button');
    garden_btn.innerHTML = 'Garden Walls';
    garden_btn.addEventListener('click', _generateGardenWalls);
    tileButtonContainer.appendChild(garden_btn);

    // Creates the Clear Map Button
    let el_clearBtn = document.createElement('button');
    el_clearBtn.innerHTML = 'Clear Map';
    el_clearBtn.addEventListener('click', _clearMapData);
    tileButtonContainer.appendChild(el_clearBtn);

    // Creates the play level button
    let play_btn = document.createElement('button');
    play_btn.innerHTML = 'Play Level';
    play_btn.addEventListener('click', playLevelInEditor);
    tileButtonContainer.appendChild(play_btn);

    // Creates the stop level button
    let stop_btn = document.createElement('button');
    stop_btn.innerHTML = 'Stop Level';
    stop_btn.addEventListener('click', quitLevelInEditor);
    tileButtonContainer.appendChild(stop_btn);

    // Load an existing level input (+ label)
    let load_level_lbl = document.createElement('label');
    load_level_lbl.innerHTML = 'Load a level (0 is shop, otherwise, n is nth level)';
    tileButtonContainer.appendChild(load_level_lbl);

    // Users cannot use keyboard to input numbers because the keyPressed function calls evt.preventDefault()
    // which disables that (though it is intended to disable scrolling with arrow keys)
    let load_level_inp = document.createElement('input');
    load_level_inp.type = "number";
    load_level_inp.id = "loadLevelInp";
    load_level_inp.name = "level to load";
    tileButtonContainer.appendChild(load_level_inp);

    let load_level_btn = document.createElement('button');
    load_level_btn.innerHTML = 'Load Level';
    load_level_btn.addEventListener('click', () => {
	const loadLevelInput = document.getElementById("loadLevelInp");
	const levelToLoad = loadLevelInput.value;

	if (levelToLoad == "") {
	    console.log("You need to click on the arrows on the input to insert an integer.");
	    return;
	}

	_loadLevelByNumber(levelToLoad);
    });
    tileButtonContainer.appendChild(load_level_btn);

}

// Load the shop level if n is 0, otherwise, load the nth level (assuming that n = 1 is the 1st level). If the
// nth level does not exist, log the error and do nothing. If the game is in editor play mode, the player can
// play the newly loaded level, but the level will be reverted to the one entering editor play mode upon
// stopping the editor play mode.
function _loadLevelByNumber(n) {
    if (n == 0) {
	loadLevel(shopLevel);
    } else if (n < 0 || n >= level.length) {
	console.log("The level number " + n + " does not correspond to any level.");
    } else {
	loadLevel(level[n]);
    }
}

function _generateReadableMapData() {
    // A list of strings, where a string represents a row of the roomGrid. For example,
    // [ "      1,    2,   3", "     20,  20, 20" ].
    let stringRows = [];

    // A list of strings, where a string represents the tile type padded to a length of 3. For example,
    // [ "  1", " 20" ].
    let stringRow = [];

    // Represents the number of tiles that have been traversed in the current row.
    // Between 0 and ROOM_COLS, if ROOM_COLS then should reset to 0, other than that always increasing.
    let currRowLen = 0;

    for (let i = 0; i <= roomGrid.length; i++) {
	if (currRowLen >= ROOM_COLS) {
	    // The row should begin with 8 spaces (for indentation)
	    stringRows.push(' '.repeat(8) + stringRow.join(","));
	    
	    currRowLen = 0;
	    stringRow = [];

	    if (i == roomGrid.length) {
		break;
	    }
	}
	

	const tileType = roomGrid[i];

	const paddedTileTypeAsString = tileType.toString().padStart(3, ' ');
	stringRow.push(paddedTileTypeAsString);
	currRowLen++;
    }

    // Every row ends with a comma and newline, except the last one.
    const listInnerString = stringRows.join(',\n');
    const out = "Copy and paste me into js/Levels.js:\n\nlevel[X] =\n    [\n" + listInnerString + "\n    ];";
    console.log(out);
}

function _generateGardenWalls() {
    
    for(var i = 0; i< roomGrid.length; i++) {
        if(roomGrid[i] == 20){
            var randNum0to2 = Math.floor(Math.random()*3);
            roomGrid[i] = 30+randNum0to2;
        }
    }
    
}

function _clearMapData() {
    if (confirm("You REALLY want to clear all tiles from the map?")) {
	loadLevel(_cleanMap.slice());
        console.log( "Map is CLEARED" )
    } else {
        return;
    }
}

function loadLevelEditor() {
    gameState = "EDITOR";
    _el_editorModeContainer.style.display = "block";
    loadLevel(_cleanMap.slice());
    console.log("Map Editing Mode");
    console.log("Press -P- to End Map Editing Mode and Play");

    canvas.addEventListener('click', _editorMouseButtonClick);
}

function closeLevelEditor() {
    _generateReadableMapData();
    _el_editorModeContainer.style.display = "none";
    gameState = "TITLE";
    loadLevel(level[currentLevel]);

    canvas.removeEventListener('click', _editorMouseButtonClick);
}

// Paints the tile at the location of the player's cursor, unless there is no tile selected,
// in which case does nothing.
function _editorMouseButtonClick(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    console.log(_storedTileValue)
    if(_storedTileValue == -1) {
	    console.log("no tile brush defined")
	    return
    }
    var clickedIndex = getTileIndexAtPixelCoord(mouseX, mouseY);

    roomGrid[getTileIndexAtPixelCoord(mouseX, mouseY)] = _storedTileValue;
}

// Did the player click the "Play Level" button of the editor?
function inEditorPlayMode() {
    return _inEditorPlayMode;
}

function playLevelInEditor() {
    _editorLevelPrePlay = roomGrid.slice();
    gameState = "PLAY";
    loadLevel(_editorLevelPrePlay);
    _inEditorPlayMode = true;
}

// Restores the editor back to its original state
function quitLevelInEditor() {
    if (!_inEditorPlayMode) {
	console.log("Attempted to stop playing level in editor even though not playing level in editor.");
	return;
    }

    roomGrid = _editorLevelPrePlay;
    gameState = "EDITOR";
    _inEditorPlayMode = false;
}


