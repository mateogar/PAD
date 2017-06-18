//resultados de cada operacion
var num1 = 0,
    num2 = 0;
//arrays de operaciones
var operacion1 = [];
var operacion2 = [];

//n?mero de rondas del juego
var NUM_ROUNDS = 20;
var rounds = 0;
var acerts = 0;
var fails = 0;
var id;
var levels = ['LOW', 'MEDIUM', 'HIGH'];
var level;
var range;

var gameBoard = '<div id="c_main" class="text-center container"> <div id="game"><div id="op1"><button id="btn_1" class="btn_op btn-block g-block" onclick="comparar(true)"></button></div><div id="texto" class="g-block"> <h2> ¿Cuál es mayor ? </h2> </div> <div id = "op2" ><button id = "btn_2" class = "btn_op btn-block g-block"onclick = "comparar(false)" > </button> </div> </div>';

var NUM_LIM = 99;
//N?mero superior de diferencia entre operaciones
var NUM_ABS = 10;
//N?mero de segundos del countdown
var NUM_SEG_COUNT = 5 * 10; //ds

var operaciones = ['+', '-', '*', '/'];



//al cargar la pantalla se llama a la funci?n principal del juego
window.onload = function() {
    let levelURL = document.URL.split("?")[1];
    let levelEnd = levelURL.split("=");
    if (levelEnd[0] == "level") {
        levelEnd = levelEnd[1];
    }
    startGame(levelEnd);
}


var startGame = function(lvl) {
    initializeHeader();
    initializeVariables(lvl);
    showRules();

}


function initializeHeader() {

    let html = '';
    html = '<div class="row">';
    html += '<div id="rounds" class="header-alert alert alert-info col-xs-4"><strong>Round:0</strong> </div>';
    html += '<div id="fails" class="header-alert alert alert-danger col-xs-4"><strong>Fails:0</strong> </div>';
    html += '<div id="success" class="header-alert alert alert-success col-xs-4"><strong>Hits:0</strong></div>';
    html += '</div>';
    $('body').append(html);


}

function initTemplate() {
    $('body').append(gameBoard);
}

function showRules() {
    let html = '';
    html = '<div class="row rules">';
    html += '<div id="info-rules" class="alert alert-warning col-xs-12">';
    html += '<h3>¡ Add , substract, divide, multiply! Guess which operation is greater and click it. </h3>';
    html += '</div><button id="rules-btn" class="btn-block btn-primary" onclick="initGame()">Start!</button>';
    html += '</div>';
    $('body').append(html);
}

function initGame() {
    window.JSInterface.putFullLayout();
    $('.rules').remove();

    initTemplate();
    play();
}






function move() {
    var elem = document.getElementById("myBar");
    $('#myBar').removeClass('progress-bar-success');
    $('#myBar').removeClass('progress-bar-danger');
    $('#myBar').addClass('progress-bar-success');
    elem.style.width = '100%';
    var count = NUM_SEG_COUNT;
    id = setInterval(frame, 100);

    function frame() {
        let width = (100 / NUM_SEG_COUNT) * count;
        elem.style.width = width + '%';


        if (count < (NUM_SEG_COUNT / 2) && count > (NUM_SEG_COUNT / 3)) {
            $('#myBar').removeClass('progress-bar-success');
            $('#myBar').addClass('progress-bar-warning');
        } else if (count < (NUM_SEG_COUNT / 3)) {
            $('#myBar').removeClass('progress-bar-warning');
            $('#myBar').addClass('progress-bar-danger');
        }

        if (count <= 0) {

            updateFails();

            clearInterval(id);

            if (rounds < NUM_ROUNDS)
                play();
            else
                showStats();
        }
        count--;
    }
}



var play = function() {

    NUM_ABS = range;
    rounds++;
    updateRounds();
    clearInterval(id);
    num1 = NUM_ABS + 1;
    num2 = 0;
    //sacar operaciones aleatorias
    while ((Math.abs(num1 - num2) > NUM_ABS) || (num1 == num2)) {
        num1 = operAleatoria(true);
        num2 = operAleatoria(false);
    }

    //mostrar operaciones en los botones
    document.getElementById("btn_1").innerHTML = operacion1[0] + " " + operaciones[operacion1[1]] + " " + operacion1[2];
    document.getElementById("btn_2").innerHTML = operacion2[0] + " " + operaciones[operacion2[1]] + " " + operacion2[2];

    //llamar funcion countdown
    move();
}
var showStats = function() {
    // document.getElementById("c_main").innerHTML = "<div id='stat_name' class='g-block'><p> UserName</p></div><div id='stat_ok' class='g-block'><p><span class='glyphicon glyphicon-ok col-sm-6'></span> Corrects: " + acerts + "</p></div><div id='stat_wr' class='g-block'><p><span class='glyphicon glyphicon-remove col-sm-6'></span> Wrongs: " + fails + "</p></div></div>";
    document.getElementById("c_main").innerHTML = "";
    updatePoints();
}

var removeAll = function() {
    document.getElementById("c_main").remove();
    document.getElementById("myProgress").remove();
}

function finish() {

    removeAll();




    var recPoints = getRecord();
    if (acerts > recPoints) {
        updatePoints();
    }




    let html = '<div class="row">';
    html += '<div id="finish" class="alert alert-warning col-xs-12">The time has finished.<strong> You got ' + acerts + ' hits.</strong>';
    html += ' Well done!</div>';
    html += '</div>';
    $('body').append(html);
    html = '<div class="row">';
    html += '<button id="share" class="btn-block btn-primary" onclick="share()">Share your score!</button>';
    html += '</div>';
    $('body').append(html);
    window.JSInterface.putGeneralLayout();
}



var alertW = function(user) {
    document.getElementById("c_main").innerHTML = "<h1>" + user + "</h1>";
}
var updateRounds = function() {
    $('#rounds').html('Round: ' + rounds);
}

var updateHits = function() {
    acerts++;
    $('#success').html('Hits: ' + acerts);
}

var updateFails = function() {
    fails++;
    $('#fails').html('Fails: ' + fails);
}




//funci?n para obtener una operaci?n aleatoria
var operAleatoria = function(flag) {
    var op1 = Math.round(Math.random() * (NUM_LIM - 1) + 1);
    var op2 = Math.round(Math.random() * (NUM_LIM - 1) + 1);
    var operacion = Math.round(Math.random() * 3);
    var tot;
    switch (operaciones[operacion]) {
        case '+':
            tot = op1 + op2;
            break;
        case '-':
            tot = op1 - op2;
            break;
        case '*':
            tot = op1 * op2;
            break;
        case '/':
            while (op1 % op2 != 0) {
                op1 = Math.round(Math.random() * (NUM_LIM - 1) + 1);
                op2 = Math.round(Math.random() * (NUM_LIM - 1) + 1);
            }
            tot = op1 / op2;
            break;
    }
    if (flag) {
        operacion1[0] = op1;
        operacion1[1] = operacion;
        operacion1[2] = op2;
    } else {
        operacion2[0] = op1;
        operacion2[1] = operacion;
        operacion2[2] = op2;
    }
    return tot;
}


function initializeVariables(currentLevel) {

    if (currentLevel === levels[0]) {
        range = 50;
        level = levels[0];
    } else if (currentLevel === levels[1]) {
        range = 30;
        level = levels[1];

    } else {
        range = 10;
        level = levels[2];
    }
}


//funci?n de comparar si la respuesta es la correcta
//seg?n los resultados de las dos operaciones
var comparar = function(flag) {
    var l_acert = document.getElementById("t-acert");
    var l_fail = document.getElementById("t-fail");
    var ant;

    if (flag) {
        if (num1 > num2) {
            // ant = l_acert.textContent;
            // ant++;

            // l_acert.innerHTML = ant;
            // acerts++;
            updateHits();
        } else {
            // ant = l_fail.textContent;
            // ant++;
            // l_fail.innerHTML = ant;
            // fails++;
            updateFails();
        }
    } else {
        if (num2 > num1) {
            // ant = l_acert.textContent;
            // ant++;
            // l_acert.innerHTML = ant;
            // acerts++;
            updateHits();
        } else {
            // ant = l_fail.textContent;
            // ant++;
            // l_fail.innerHTML = ant;
            // fails++;
            updateFails();
        }
    }
    //llamada a la funci?n jugar para volver a jugar otra ronda si la hubiese
    if (rounds < NUM_ROUNDS) {
        play();
    } else {
        clearInterval(id);
        finish();
    }
}



//Comunicación con android
//
var updatePoints = function() {
    window.JSInterface.updatePnts(acerts, fails, "WIG", this.level);
}

var getRecord = function() {
    return window.JSInterface.getRecord("WIG", level);
}

var share = function() {
    window.JSInterface.share(acerts, "WIG", level);
}
