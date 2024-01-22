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
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
if(thisKey == thisPlayer.controlKeyForNorth) {
    thisPlayer.keyHeld_North = setTo;
    thisPlayer.facingDirection = "up";
}
if(thisKey == thisPlayer.controlKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
    thisPlayer.facingDirection = "right";
}
if(thisKey == thisPlayer.controlKeyForSouth) {
    thisPlayer.keyHeld_South = setTo;
    thisPlayer.facingDirection = "down";
}
if(thisKey == thisPlayer.controlKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
    thisPlayer.facingDirection = "left";
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

    if(evt.key == "1"){
        //check inventory slot one for pickupType and return function
        console.log("Key 1 has been pressed")

        hudDisplay.pickupTypes[hudDisplay.inventory[0]].call(hudDisplay);

    }
    if(evt.key == "2"){

    }
    if(evt.key == "3"){
        
    }

    evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
    setKeyHoldState(evt.keyCode, p1, false);
}