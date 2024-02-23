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

function initInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('click', mouseButtonClicked);
	canvas.addEventListener('mousedown', mouseButtonPressed);
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}


function mouseButtonClicked(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	console.log(storedTileValue)
	if(storedTileValue == -1) {
		console.log("no tile brush defined")
		return
	}
	var clickedIndex = getTileIndexAtPixelCoord(mouseX, mouseY);
	
	roomGrid[getTileIndexAtPixelCoord(mouseX, mouseY)] = storedTileValue;
}

function mouseButtonPressed(evt) {

}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
	if(thisKey == thisPlayer.controlKeyForNorth) {
		thisPlayer.keyHeld_North = setTo;
		thisPlayer.facingDirection = "UP";
	}
	if(thisKey == thisPlayer.controlKeyForEast) {
		thisPlayer.keyHeld_East = setTo;
		thisPlayer.facingDirection = "RIGHT";
	}
	if(thisKey == thisPlayer.controlKeyForSouth) {
		thisPlayer.keyHeld_South = setTo;
		thisPlayer.facingDirection = "DOWN";
	}
	if(thisKey == thisPlayer.controlKeyForWest) {
		thisPlayer.keyHeld_West = setTo;
		thisPlayer.facingDirection = "LEFT";
	}
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, p1, true);

	if(evt.key == " "){
		p1.swordAttack();
	}

	if(evt.keyCode == KEY_LETTER_X){
		p1.boomStickShot();
	}
	
	if(TitleScreen || MapEditingMode){
		if(evt.key == "p" || evt.key == "P"){
			TitleScreen = false;
			MapEditingMode = false;
			loadLevel(level[currentLevel]);
		}
	}

	if(TitleScreen == true && (evt.key == "e" || evt.key == "E")) {
		MapEditingMode = true;
		TitleScreen = false;
		loadLevel(freshMap);
		console.log("Map Editing Mode");
		console.log("Press -P- to End Map Editing Mode and Play")
	}


	if(evt.key == "1"){
		//check inventory slot one for pickupType and return function
		console.log("Key 1 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[0]].call(hudDisplay);
		hudDisplay.inventory[0] = 0;
	}
	if(evt.key == "2"){
		console.log("Key 2 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[1]].call(hudDisplay);
		hudDisplay.inventory[1] = 0;
	}
	if(evt.key == "3"){
		console.log("Key 3 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[2]].call(hudDisplay);
		hudDisplay.inventory[2] = 0;
	}
	if(evt.key == "4"){
		console.log("Key 4 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[3]].call(hudDisplay);
		hudDisplay.inventory[3] = 0;
	}
	if(evt.key == "5"){
		console.log("Key 5 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[4]].call(hudDisplay);
		hudDisplay.inventory[4] = 0;
	}
	if(evt.key == "6"){
		console.log("Key 6 has been pressed")
		hudDisplay.pickupTypes[hudDisplay.inventory[5]].call(hudDisplay);
		hudDisplay.inventory[5] = 0;
	}

	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
}