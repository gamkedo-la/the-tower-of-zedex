function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function drawBitmapCenteredAnimFrame(useBitmap, atX,atY, frameNum, vertNum, frameDim) {
	var dimSize;
	if(frameDim == undefined || frameDim == 0) {
		dimSize = useBitmap.height;
	} else {
		dimSize = frameDim;
	}
	canvasContext.drawImage(useBitmap,
		frameNum*dimSize,vertNum*dimSize,
		dimSize,dimSize,
		atX-dimSize/2,atY-dimSize/2,
		dimSize,dimSize);
}

function printText( message, xPosition, yPosition, textSize, color ) {
	canvasContext.fillStyle = color;
	canvasContext.font = textSize + "px Arial";
	canvasContext.fillText( message, xPosition, yPosition );
}

function drawRect( topLeftX, topLeftY, width, height, lineWidth, color ) {
	canvasContext.beginPath();
				canvasContext.strokeStyle = color;
				canvasContext.lineJoin = "round";
				canvasContext.lineWidth = lineWidth;
				canvasContext.rect( topLeftX, topLeftY, width, height )
				canvasContext.stroke();
}

function drawCircle(centerX, centerY, radius, color) {
	canvasContext.strokeStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.stroke();
}


