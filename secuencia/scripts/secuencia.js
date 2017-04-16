(function() {
    /*Inicializar la tabla vacia (6x8)*/
	var html = '';
	var id = 1;
	var MAX_FILAS = 6;
	var MAX_COLUM = 8;
	for (i=0;i<MAX_FILAS;i++) {
		html += '<tr>'; 
		for (j=0;j<MAX_COLUM;j++) { 
			html += '<td><div class="cell" id="' + id +'"></div></td>';
			id++;
			if(j == 7) html += '</tr>';
		} 
	}

    $(document).ready(function() {
        initializeBoard();
		initializeRound();
    });

	function initializeBoard() {
        $('body').append('<table id="board" class="table table-bordered"></table>');
        $("#board").append(html);
    }

	function initializeRound() {
		var randPosition = [];
		var randValues = [];
		var randSense; //0 Red buttons, 1 Blue buttons
		randSense = numRandom(0,1);
		var numButtons = 6;
		var MIN_VALUE = -15;
		var MAX_VALUE = 15;
		for (i=0;i<numButtons;i++) {
			//Generamos la posiciones que tendrán un boton
			randP = numRandom(0, MAX_FILAS*MAX_COLUM);
			while(randPosition.indexOf(randP) != -1){
				randP = numRandom(0, MAX_FILAS*MAX_COLUM);
			}
			randPosition[i] = randP;
			
			//Generamos los valores que tendrán esos botones
			randValue = numRandom(MIN_VALUE, MAX_VALUE);
			while(randValues.indexOf(randValue) != -1){
				randValue = numRandom(MIN_VALUE, MAX_VALUE);
			}
			randValues[i] = randValue;
		}
		
		appendButtons(randPosition, randValues, numButtons);
    }
	
	function numRandom(min, max){
		var range = max - min;
		var rand = Math.random() * range;
		rand = Math.round(rand);
		return parseInt(min) + rand;
	}
	
	function appendButtons(randPosition, randValues, numButtons){
		for (i=0;i<numButtons;i++) {
			$("#board #"+randPosition[i]).append("<button class='round-button'>" + randValues[i] + "</button>");
		}
	}
	
