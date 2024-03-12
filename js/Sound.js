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

function BackgroundMusicClass(filenameWithPath){
	
	var musicSound = null;
	
	this.loopSong = function(filenameWithPath){
		setFormat(); 
		
		if(musicSound != null){
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/"+filenameWithPath+audioFormat);
		musicSound.loop = true;
		musicSound.volume = 0.5;
		musicSound.play();
	}
	
	this.startOrStopMusic = function(){
		if(musicSound.paused){
			musicSound.play();
		} else {
			musicSound.pause();
		}
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
//var backgroundMusic = new BackgroundMusicClass("backgroundMusic");
