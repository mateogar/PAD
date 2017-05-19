var NUM_SEG_COUNT =	45;
var MAX_FILAS = 6;
var MAX_COLUM = 6
var MIN_VALUE = -9;
var MAX_VALUE = 9;
var numButtons = 2;
var id;

var round = 1;
var success = 0;

var randSense; //0 Red buttons, 1 Blue buttons
var randPosition = [];
var randValues = [];


$(document).ready(function() {
	html =  '<div class="row">';
	html += '<div id="rounds" class="alert alert-info col-xs-6"><strong>Round:</strong> </div>';
	html += '<div id="success" class="alert alert-success col-xs-6"><strong>Success:</strong></div>';
	html += '</div>';
	$('body').append(html);
	move();
	initializeBoard();
});

function initializeBoard() {
	/*Inicializar la tabla vacia (6x8)*/
	var html = '';
	var num = 1;
	for (i=0;i<MAX_FILAS;i++) {
		html += '<div class="row cell">'; 
		for (j=0;j<MAX_COLUM;j++) { 
			html += '<div class="col-xs-2 " id="' + num +'"></div>';
			num++;
		} 
		html += '</div>';
	}
	
	$('#rounds').append('<span> '+round+'</span>');
	$('#success').append('<span> '+success+'</span>');
	$('body').append('<div id="board"></div>');
	$("#board").append(html);
	
	
	initializeRound();
}

function initializeRound() {
	
	randSense = numRandom(0,1);
	if (numButtons < 6){
		numButtons++;
	}
	for (i=0;i<numButtons;i++) {
		//Generamos la posiciones que tendrán un boton
		randP = numRandom(1, MAX_FILAS*MAX_COLUM);
		while(randPosition.indexOf(randP) != -1){
			randP = numRandom(1, MAX_FILAS*MAX_COLUM);
		}
		randPosition[i] = randP;
		
		//Generamos los valores que tendrán esos botones
		randValue = numRandom(MIN_VALUE, MAX_VALUE);
		while(randValues.indexOf(randValue) != -1){
			randValue = numRandom(MIN_VALUE, MAX_VALUE);
		}
		randValues[i] = randValue;
	}
	
	if (randSense){
		randValues.sort(comparate);		
	}else{
		randValues.sort(comparateInverse);
	}
	
	if(randSense){
		img = 'b';//blue
	}else{
		img = 'r';//red
	}
	
	appendButtons(img);
	
}

function numRandom(min, max){
	var range = max - min;
	var rand = Math.random() * range;
	rand = Math.round(rand);
	return parseInt(min) + rand;
}


function appendButtons(img){
	for (i=0;i<numButtons;i++) {
		$("#board #"+randPosition[i]).append("<img src='img/"+randValues[i]+img+".png' class='imgBtn' id='btn"+randValues[i]+"' onclick='checkClick(event)'>");
	}
}

function move() {
	var elem = document.getElementById("myBar");
	elem.style.width = '100%';	
	var count = NUM_SEG_COUNT;
	id = setInterval(frame, 1000);
	
	function frame(){
		
		width = (100/NUM_SEG_COUNT)*count;
		elem.style.width = width + '%'; 
		
		if (count == 15) {
			$('#myBar').removeClass('progress-bar-success');
			$('#myBar').addClass('progress-bar-warning');
		}
		
		if (count == 5) {
			$('#myBar').removeClass('progress-bar-warning');
			$('#myBar').addClass('progress-bar-danger');
		}
		
		if (count == 0) {
			elem.style.width = '0%';
			clearInterval(id);
			finish();
		}
		count--;
	}
}

function play(){				
	round++;	
	resetBoard();
	initializeBoard();		
}

function resetBoard(){
	$('#rounds span').remove();
	$('#success span').remove();
	$('#board').remove();
}

function checkClick(event){
	val = event.target.id.substring(3);
	if(val == randValues[0]){
		randValues.shift();
		$('#'+event.target.id).remove();
		if (randValues.length == 0){
			success++;
			play();
		}
	}else{		
		play();		
	}	
}

function comparate ( a, b ){ 
	return a-b;
}

function comparateInverse ( a, b ){ 
	return b-a;
}

function finish(){
	$('#board').remove();
	
	html =  '<div class="row">';
	html += '<div id="finish" class="alert alert-warning col-xs-12">The time has finished.<strong> You got '+success+' success of '+round+' rounds.</strong>';
	html += ' Well done!</div>';
	html += '</div>';
	$('body').append(html);
}




