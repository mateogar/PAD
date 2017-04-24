var NUM_SEG_COUNT =	10;
var MAX_FILAS = 6;
var MAX_COLUM = 6
var MIN_VALUE = -9;
var MAX_VALUE = 9;
var numButtons = 6;
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
	move();
	
	randSense = numRandom(0,1);
	
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
	
	appendButtons(randPosition, randValues, numButtons);
	
	if (randSense){
		$(".round-button").css("background-color","lightblue");	
	}else{
		$(".round-button").css("background-color","red");
	}
}

function numRandom(min, max){
	var range = max - min;
	var rand = Math.random() * range;
	rand = Math.round(rand);
	return parseInt(min) + rand;
}


function appendButtons(randPosition, randValues, numButtons){
	for (i=0;i<numButtons;i++) {
		$("#board #"+randPosition[i]).append("<button class='round-button' onclick='checkClick(event)' id='button"+i+"'>" + randValues[i] + "</button>");
	}
}

function move() {
	//inicializaci?n del contdown
	var elem = document.getElementById("myBar");
	elem.style.width = '0%';	
	var count = 1;
	id = setInterval(frame, 1000);
	
	function frame() {
		if (count > NUM_SEG_COUNT) {
			//se limpia el Interval			
			play();
		} else {
			width = count * (100 / NUM_SEG_COUNT);
			elem.style.width = width + '%'; 
			count++;
		}
	}
}

function play(){
	clearInterval(id);			
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
	if(event.target.innerHTML == randValues[0]){
		randValues.shift();
		$('#'+event.target.id).hide();
		if (randValues.length == 0){
			console.log("Ronda sucesosa");
			success++;
			play();
		}
	}else{		
		play();		
	}	
}

function comparate ( a, b ){ 
	return a - b;
}

function comparateInverse ( a, b ){ 
	return b-a;
}





