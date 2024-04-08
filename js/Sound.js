var audioFormat;

function setFormat(){
	var audio = new Audio();
	if (audio.canPlayType("audio/mp3")){ // true in 99.8% of browsers
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function SoundOverlapsClass(filenameWithPath) {
	
	setFormat();
	
	var mainSound = new Audio("sound/"+filenameWithPath+audioFormat);
	var altSound = new Audio("sound/"+filenameWithPath+audioFormat);
	
	var altSoundTurn = false;
	
	this.play = function(volume=0.3) {
		if(altSoundTurn) {
			altSound.currentTime = 0;
            altSound.volume = volume;
			altSound.play();
		} else {
			mainSound.currentTime = 0;
            mainSound.volume = volume;
			mainSound.play();
		}
		altSoundTurn = !this.altSoundTurn;
	}

}	

function BackgroundMusicClass(){
	
    var MUSIC_VOLUME = 0.1;
    var musicSound = null;
	
	this.loopSong = function(filenameWithPath){
		// mp3 or ogg?
        setFormat(); 
		// stop existing music if we're starting a new one
        if(musicSound != null){
			musicSound.pause();
			musicSound = null;
		}
    	console.log("Looping background music...");
		musicSound = new Audio("sound/"+filenameWithPath+audioFormat);
		musicSound.loop = true;
		musicSound.volume = MUSIC_VOLUME;
		musicSound.play();
	}
}

// Sound //
var playerHurt = new SoundOverlapsClass("playerHurt");
var pickup = new SoundOverlapsClass("pickUp");
var swordSwing = new SoundOverlapsClass("swordSwing");
var boomstickFire = new SoundOverlapsClass("bulletHitEnemy");
var enemyHitSword = new SoundOverlapsClass("swordHitEnemy");
var enemyHitBullet = new SoundOverlapsClass("bulletHitEnemy")
var useKey = new SoundOverlapsClass("useKey")
// Music //
var backgroundMusic = new BackgroundMusicClass();
