// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_LETTER_X = 88;
const KEY_LETTER_N = 78;
const KEY_LETTER_P = 80;
const KEY_SPACEBAR = 32;

// For input throughout all the states
function initInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mousedown', mouseButtonPressed);
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW,
					 KEY_LETTER_W,KEY_LETTER_D,KEY_LETTER_S,KEY_LETTER_A);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

var firstClickEver = true;
function mouseButtonPressed(evt) {

    if (firstClickEver) {
        backgroundMusic.loopSong("MainMenuMusic",MAIN_MENU_MUSIC_VOLUME);
        firstClickEver = false;
    }

    if(gameState == "WINSCREEN") {
    	location.reload();
    }

}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
	var keyUsedByGame = false;
	if(thisKey == thisPlayer.controlKeyForNorth || thisKey == thisPlayer.controlKeyForNorth2) {
		thisPlayer.keyHeld_North = setTo;
		thisPlayer.facingDirection = "UP";
		keyUsedByGame = true;
	}
	if(thisKey == thisPlayer.controlKeyForEast || thisKey == thisPlayer.controlKeyForEast2) {
		thisPlayer.keyHeld_East = setTo;
		thisPlayer.facingDirection = "RIGHT";
		keyUsedByGame = true;
	}
	if(thisKey == thisPlayer.controlKeyForSouth || thisKey == thisPlayer.controlKeyForSouth2) {
		thisPlayer.keyHeld_South = setTo;
		thisPlayer.facingDirection = "DOWN";
		keyUsedByGame = true;
	}
	if(thisKey == thisPlayer.controlKeyForWest || thisKey == thisPlayer.controlKeyForWest2) {
		thisPlayer.keyHeld_West = setTo;
		thisPlayer.facingDirection = "LEFT";
		keyUsedByGame = true;
	}
	return keyUsedByGame;
}

function keyPressed(evt) {
	var keyUsedByGame = setKeyHoldState(evt.keyCode, p1, true);

	if(gameState == "CREDITS") {
		gameState = "TITLE";
		return;
	}
	
	if(gameState == "TITLE"){
		if(evt.keyCode == KEY_LETTER_P || evt.key == "p" || evt.key == "P"){
            backgroundMusic.loopSong("backgroundMusic");
			gameState = "PLAY";
			loadLevel(level[currentLevel]);
			keyUsedByGame = true;
		}

		if(evt.key == "c" || evt.key == "C") {
			gameState = "CREDITS";
			keyUsedByGame = true;
		}

	    if(evt.key == "e" || evt.key == "E") {
			loadLevelEditor();
			keyUsedByGame = true;
		}
	}

	if(gameState == "EDITOR" && (evt.keyCode == KEY_LETTER_P || evt.key == "p" || evt.key == "P" || evt.key == "b" || evt.key == "B" )){
		closeLevelEditor();
		keyUsedByGame = true;
	}

    // The keys below are for PLAY state only.
    if (gameState != "PLAY") {
        return;
    }

    if(evt.keyCode == KEY_LETTER_N) {
    	currentLevel += 1;
	  	loadLevel(level[currentLevel]);
	  	keyUsedByGame = true;
    }

    if(evt.keyCode == KEY_SPACEBAR || evt.key == " "){
	    p1.swordAttack();
	    keyUsedByGame = true;
    }

	if(evt.keyCode == KEY_LETTER_X){
		p1.boomStickShot();
		keyUsedByGame = true;
	}
    
	if(evt.key == "1"){
		//check inventory slot one for pickupType and return function
		console.log("Key 1 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[0]].call(hudDisplay);
		if(hudDisplay.inventory[0] != INV_KEY && hudDisplay.inventory[0] != INV_MASTERKEY) {
			hudDisplay.inventory[0] = 0;
		}
		keyUsedByGame = true;
	}
	if(evt.key == "2"){
		console.log("Key 2 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[1]].call(hudDisplay);
		if(hudDisplay.inventory[1] != INV_KEY && hudDisplay.inventory[1] != INV_MASTERKEY) {
			hudDisplay.inventory[1] = 0;
		}
		keyUsedByGame = true;
	}
	if(evt.key == "3"){
		console.log("Key 3 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[2]].call(hudDisplay);
		if(hudDisplay.inventory[2] != INV_KEY && hudDisplay.inventory[2] != INV_MASTERKEY) {
			hudDisplay.inventory[2] = 0;
		}
		keyUsedByGame = true;
	}
	if(evt.key == "4"){
		console.log("Key 4 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[3]].call(hudDisplay);
		if(hudDisplay.inventory[3] != INV_KEY && hudDisplay.inventory[3] != INV_MASTERKEY) {
			hudDisplay.inventory[3] = 0;
		}
		keyUsedByGame = true;
	}
	if(evt.key == "5"){
		console.log("Key 5 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[4]].call(hudDisplay);
		if(hudDisplay.inventory[4] != INV_KEY && hudDisplay.inventory[4] != INV_MASTERKEY) {
			hudDisplay.inventory[4] = 0;
		}
		keyUsedByGame = true;
	}
	if(evt.key == "6"){
		console.log("Key 6 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[5]].call(hudDisplay);
		if(hudDisplay.inventory[5] != INV_KEY && hudDisplay.inventory[5] != INV_MASTERKEY) {
			hudDisplay.inventory[5] = 0;
		}
		keyUsedByGame = true;
	}
	if(keyUsedByGame) {
		evt.preventDefault(); // avoids arrows or space scrolling browser page
	}
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
}
