var rounds = 5;
var round = 2;
var cont = 0;
var num;
var acertado = false;
var acerts = 0;
var numPhases = 0;
var fails = 0;
var images = ['img/first.png','img/second.png'];
var img = true;
var NUM_SEG_COUNT = 5;
var id;
var levels = {"EASY": 2, "MEDIUM": 3, "HARD": 4};

var levels = ['LOW', 'MEDIUM', 'HIGH'];
var level;

var initializeRound = function(){

	acertado = false;
	numPhases++;
	cont = 0;
}

function initializeVariables(currentLevel) {

        if (currentLevel === levels[0]) {
            round = 2;
            level = levels[0];
        } else if (currentLevel === levels[1]) {
            round = 3;
            level = levels[1];

        } else {
            round=4;
            level = levels[2];
        }
    }



var startRound = function(){
	var image = Math.round(Math.random());
	$("#gamecontainer").empty();
	var i, j;
	var w = Math.floor(100/(round*2));
	for(i=0; i<round*2; i++){
		$("#gamecontainer").append("<tr>");
		for(j=0; j<round*2; j++){
			$("#gamecontainer").append("<td><input type='image' src='"+images[image]+"' class='square' id='sq"+ cont +"' onclick='pulsado(event);' style='width:"+ w +"%'></input></td>");
			cont++;
		}
		$("#gamecontainer").append("</tr>");
	}
	num = Math.round(Math.random()*(Math.pow(round*2, 2)-1));
	var other = images[Math.abs(image-1)];
	$("#sq"+num).attr("src",other);
}

var pulsado = function(e){
	var boton = e.target;
	var id = boton.id;
	var identF = id.substr(2, id.length);
	if(identF == num){
		acerts++;
		document.getElementById('t-acert').innerHTML = acerts;
	}else{
		fails++;
		document.getElementById('t-fail').innerHTML = fails;
	}
	if(numPhases < rounds){
		playGame();
	}else{
		clearInterval(id);
		showStats();
	}
}

var showStats = function(){
	document.getElementById("c_main").innerHTML = "<div id='stat_name' class='g-block'><p> UserName</p></div><div id='stat_ok' class='g-block'><p><span class='glyphicon glyphicon-ok col-sm-6'></span> Corrects: "+acerts+"</p></div><div id='stat_wr' class='g-block'><p><span class='glyphicon glyphicon-remove col-sm-6'></span> Wrongs: "+fails+"</p></div>";
    updatePoints();
}

//funcion countdown
function move() {
	//inicializaci?n del contdown
    var elem = document.getElementById("myBar");
	elem.style.width = '0%';	
    var count = 1;
    id = setInterval(frame, 1000);
	
    function frame() {
        if (count > NUM_SEG_COUNT) {
			//se limpia el Interval
            clearInterval(id);
			fails++;
			//se llama de nuevo a jugar si quedan rondas
			if(numPhases < rounds){
				document.getElementById('t-fail').innerHTML = fails;
				playGame();
			}else{
				clearInterval(id);
				showStats();
			}
        } else {
			width = count * (100 / NUM_SEG_COUNT);
            elem.style.width = width + '%'; 
			count++;
        }
    }
}

var playGame = function(){
	clearInterval(id);
	initializeRound();
	startRound();
	//llamar funcion countdown
	move();
}

var startGame = function(lvl) {
    initializeVariables(lvl);
    playGame();

}

var updatePoints = function(){
    window.JSInterface.updatePnts(acerts, fails, "PG", level);
}


window.onload = function(){
	startGame("LOW");
}