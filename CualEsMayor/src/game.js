//resultados de cada operacion
var num1 = 0, num2 = 0;
//arrays de operaciones
var operacion1 = [];
var operacion2 = [];

//n?mero de rondas del juego
var NUM_ROUNDS = 20;
var rounds = 0;
var acerts = 0;
var fails = 0;
var id;

//N?mero superior de l?mite
var NUM_LIM = 99;
//N?mero superior de diferencia entre operaciones
var NUM_ABS = 10;
//N?mero de segundos del countdown
var NUM_SEG_COUNT = 5;

var operaciones = ['+','-','*','÷'];

//funci?n para obtener una operaci?n aleatoria
var operAleatoria = function(flag){
	var op1 = Math.round(Math.random()*(NUM_LIM - 1) + 1);
	var op2 = Math.round(Math.random()*(NUM_LIM - 1) + 1);
	var operacion = Math.round(Math.random()*3);
	var tot;
	switch(operaciones[operacion]){
		case '+': tot = op1 + op2; break;
		case '-': tot = op1 - op2; break;
		case '*': tot = op1 * op2; break;
		case '÷': 
			while(op1%op2 != 0){
				op1 = Math.round(Math.random()*(NUM_LIM - 1) + 1);
				op2 = Math.round(Math.random()*(NUM_LIM - 1) + 1);
			}
			tot = op1 / op2;
			break;
	}
	if(flag){
		operacion1[0] = op1;
		operacion1[1] = operacion;
		operacion1[2] = op2;
	}else{
		operacion2[0] = op1;
		operacion2[1] = operacion;
		operacion2[2] = op2;
	}
	return tot;
}

	
//funci?n de comparar si la respuesta es la correcta
//seg?n los resultados de las dos operaciones 
var comparar = function(flag){
	var l_acert = document.getElementById("t-acert");
	var l_fail = document.getElementById("t-fail");
	var ant;
	if(flag){
		if(num1 > num2){
			ant = l_acert.textContent;
			ant++;
			l_acert.innerHTML = ant;
			acerts++;
		}else{
			ant = l_fail.textContent;
			ant++;
			l_fail.innerHTML = ant;
			fails++;
		}
	}else{
		if(num2 > num1){
			ant = l_acert.textContent;
			ant++;
			l_acert.innerHTML = ant;
			acerts++;
		}else{
			ant = l_fail.textContent;
			ant++;
			l_fail.innerHTML = ant;
			fails++;
		}
	}
	//llamada a la funci?n jugar para volver a jugar otra ronda si la hubiese
	if(rounds < NUM_ROUNDS){
		play();
	}else{
		clearInterval(id);
		showStats();
	}
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
			//se a?ade uno err?neo
			var l_fail = document.getElementById("t-fail");
			var ant;
			ant = l_fail.textContent;
			ant++;
			l_fail.innerHTML = ant;
			fails++;
			//se llama de nuevo a jugar si quedan rondas
				if(rounds < NUM_ROUNDS){
					play();
				}else{
					showStats();
				}
        } else {
			width = count * (100 / NUM_SEG_COUNT);
            elem.style.width = width + '%'; 
			count++;
        }
    }
}

var play = function(){
	rounds++;
	clearInterval(id);
	num1 = NUM_ABS + 1;
	num2 = 0;
	//sacar operaciones aleatorias
	while(Math.abs(num1-num2)>NUM_ABS){
		num1 = operAleatoria(true);
		num2 = operAleatoria(false);
	}
	
	//mostrar operaciones en los botones
	document.getElementById("btn_1").innerHTML = operacion1[0] + " " + operaciones[operacion1[1]] + " " + operacion1[2];
	document.getElementById("btn_2").innerHTML = operacion2[0] + " " + operaciones[operacion2[1]] + " " + operacion2[2];
	
	//llamar funcion countdown
	move();
}

var showStats = function(){
	document.getElementById("c_main").innerHTML = "<div id='stat_name' class='g-block'><p> UserName</p></div><div id='stat_ok' class='g-block'><p><span class='glyphicon glyphicon-ok col-sm-6'></span> Corrects: "+acerts+"</p></div><div id='stat_wr' class='g-block'><p><span class='glyphicon glyphicon-remove col-sm-6'></span> Wrongs: "+fails+"</p></div>";
}

//al cargar la pantalla se llama a la funci?n principal del juego
window.onload = function(){
	play();
}

