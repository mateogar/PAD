var rounds = 4;
var round = 0;
var cont = 0;
var num;
var acertado = false;
var acerts = 0;
var fails = 0;
var images = ['img/first.png','img/second.png'];
var img = true;
var NUM_SEG_COUNT = 5;
var id;

var initializeRound = function(){
	acertado = false;
	round++;
	cont = 0;
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
	if(round<rounds){
		playGame();
	}else{
		clearInterval(id);
		showStats();
	}
}

var showStats = function(){
	document.getElementById("c_main").innerHTML = "<div id='stat_name' class='g-block'><p> UserName</p></div><div id='stat_ok' class='g-block'><p><span class='glyphicon glyphicon-ok col-sm-6'></span> Corrects: "+acerts+"</p></div><div id='stat_wr' class='g-block'><p><span class='glyphicon glyphicon-remove col-sm-6'></span> Wrongs: "+fails+"</p></div>";
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
			
			//se llama de nuevo a jugar si quedan rondas
			if(round < rounds){
				fails++;
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

window.onload = function(){
	playGame();
	
	
}