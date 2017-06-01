'use strict';



//En una partida hay una pregunta de cada categoría
const categories = {
    0: 'Arte y Literatura',
    1: 'Deportes',
    2: 'Ciencia',
    3: 'Historia',
    4: 'Geografía',
    5: 'Cine y Cultura'
}

let quiz;
let idQuest;
let idCat = 0;
let interval;
const MAX_OPTS = 4;
let hits = 0;
let fails = 0;
let rounds = 0;

var level = ['LOW', 'MEDIUM', 'HIGH'];

var currentL;

//Segundos que dura una ronda.
var MAX_TIME = 10 * 10; //ds
//Segundos que han pasado desde iniciarse el timer.
var timeBar = 0;
//Número de categorías diferentes
const MAX_CAT = 6;
//Preguntas por categorías
const MAX_QUEST = 4;
//Cargamos el json
$.getJSON("scripts/questions.json", function(json) {
    quiz = json;
    startGame();
});


function startGame() {
    let levelURL = document.URL.split("?")[1];
    let levelEnd = levelURL.split("=");
    if(levelEnd[0]=="level"){
        levelEnd = levelEnd[1];
    }
    initializeVariables(levelEnd);
    initializeHeader();
    showRules();
    console.log(quiz[categories[idCat]][0][currentL][0].question);
    //quiz[categories[idCat]][idQuest].question

}

function initGame() {
    $('.rules').remove();
    //move();
    initializeTemplate();
    createQuestion();
    addListeners();
}

function initializeVariables(currentLevel) {
    if (currentLevel === level[0]) {
        currentL = level[0];

    } else if (currentLevel === level[1]) {

        currentL = level[1];
    } else {

        currentL = level[2];
    }
}

function initializeHeader() {
    let html = '';
    html = '<div class="row">';
    html += '<div id="rounds" class=" header-alert alert alert-info col-xs-4"><strong>Round:</strong> </div>';
    html += '<div id="category" class="header-alert alert alert-success col-xs-4"><strong>Category:</strong> </div>';
    html += '<div id="success" class="header-alert alert alert-success col-xs-4"><strong>Hits: 0</strong></div>';
    html += '</div>';
    $('body').append(html);
}

function initializeTemplate() {
    $('body').append('<div id="question"></div>');
    $('body #question').append('<h2></h2>');
    $('body').append('<section class="options col-xs-12 col-sm-offset-2 col-sm-8"></section>');
    $('body section').append('<ul></ul>');
    for (let i = 1; i <= MAX_OPTS; i++) {
        $('body section ul').append('<div id="' + i + '"></div>');
        $('body section ul #' + i).append('<li></li>');
    }

    $('body').append('<p id="score">');
    // $('#score').append('<span id="hits" >Hits: ' + hits + ' </span>');

    // $('#score').append('<span id="fails" > Fails: ' + fails + ' </span>');
}

function showRules() {
    let html = '';
    html = '<div class="row rules">';
    html += '<div id="info-rules" class="alert alert-warning col-xs-12"> ';
    html += '<h3>You will see 6 questions of 6 diferent topics. Be wise and fast answering. </h3>';
    html += '</div><button id="rules-btn" class="btn-block btn-primary" onclick="initGame()">Start!</button>';
    html += '</div>';
    $('body').append(html);
}

//En cada ronda hay una pregunta de cada categoría





//funcion move
function move() {
    var elem = document.getElementById("myBar");
    $('#myBar').removeClass('progress-bar-success');
    $('#myBar').removeClass('progress-bar-danger');
    $('#myBar').addClass('progress-bar-success');
    elem.style.width = '100%';
    var count = MAX_TIME;
    interval = setInterval(frame, 100);

    function frame() {

        let width = (100 / MAX_TIME) * count;
        elem.style.width = width + '%';


        if (count < (MAX_TIME / 2) && count > (MAX_TIME / 3)) {
            $('#myBar').removeClass('progress-bar-success');
            $('#myBar').addClass('progress-bar-warning');
        } else if (count < (MAX_TIME / 3)) {
            $('#myBar').removeClass('progress-bar-warning');
            $('#myBar').addClass('progress-bar-danger');
        }
        if (count <= 0) {
            elem.style.width = '0%';
            clearInterval(interval);
            updateFails();
            nextQuestion();
        }
        count--;
    }
}



function createQuestion() {

    updateRoundCounter();
    //El id de la pregunta es aleatorio    
    idQuest = getRandomInt(0, MAX_QUEST - 1);
    $('.options div').css("background-color", "orange");

    $('#question h2').html(quiz[categories[idCat]][0][currentL][idQuest].question);
    for (let i = 1; i <= MAX_OPTS; i++) {
        let id = '.options #' + i + ' li';

        $(id).html(quiz[categories[idCat]][0][currentL][idQuest].options[i - 1]);


    }
    move();

}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function removeAll() {
    $('body section').remove();
    $('#question').remove();
    $('h3').remove();
    $('body #c_time').remove();
    $('body #score').remove();
}

function showScore() {
    $('body').append('<h1>Score: ' + hits + '</h1>');
    $('body').append('<h1> Fails: ' + fails + '</h1>');
    updatePoints();
}



function updateHits() {
    hits++;
    $('#success').html('Hits: ' + hits);
    // $('#hits').html('Hits: ' + hits);
}

function updateFails() {
    fails++;
    $('#fails').html(' Fails: ' + fails);
}

function addListeners() {
    /*Ahora se añade el listener a los clicks del jugador sobre las opciones*/
    $(".options div").click(function() {
        //Cuando pulsen una pregunta se comprueba si es la correcta
        if (this.id === quiz[categories[idCat]][0][currentL][idQuest].answer) {
            let that = this;
            $(that).css("background-color", "green");
            updateHits();
            clearInterval(interval);
            var timeoutId1 = setTimeout(function() {

                clearTimeout(timeoutId1);
                nextQuestion();
            }, 1000);



        } else {
            $(this).css("background-color", "red");
            updateFails();
            clearInterval(interval);
            let that = this;
            var timeoutId2 = setTimeout(function() {

                clearTimeout(timeoutId2);
                nextQuestion();
            }, 1000);

        }
    });
}

function nextQuestion() {

    idCat++; //Se cambia de categoría
    if (idCat < MAX_CAT) {
        createQuestion();
        timeBar = 0;
    } else {
        //Eliminar el DOM de pregunta y opciones y mostrar la puntuación total
        finish();


    }

}

function updateRoundCounter() {
    rounds++;
    $('#rounds').html('Round: ' + rounds);
    $('#category').html('Category: ' + categories[idCat]);
}

function finish() {
    removeAll();
    var recPoints = getRecord();
    if (hits > recPoints) {
        updatePoints();
    }
    //$('body').append(recPoints);

    let html = '<div class="row">';
    html += '<div id="finish" class="alert alert-warning col-xs-12">The time has finished.<strong> You got ' + hits + ' hits.</strong>';
    html += ' Well done!</div>';
    html += '</div>';
    $('body').append(html);
    html = '<div class="row">';
    html += '<button id="share" class="btn-block btn-primary" onclick="share()">Share your score!</button>';
    html += '</div>';
    $('body').append(html);

}

////Comunicación con android
///
var updatePoints = function() {
    window.JSInterface.updatePnts(hits, 0, "AM", currentL);
}


var getRecord = function() {
    return window.JSInterface.getRecord("AM", currentL);
}

var share = function() {
    window.JSInterface.share(hits, "AM", currentL);
}
