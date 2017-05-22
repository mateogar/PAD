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

    var level = ['LOW', 'MEDIUM', 'HIGH'];

    var currentL;

    //Segundos que dura una ronda.
    var MAX_TIME = 10;
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
        addListeners();
    });


    function startGame() {
        initializeVariables("MEDIUM");
        initializeTemplate();
        createQuestion();
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

    function initializeTemplate() {
        initializeTimer();
        $('body').append('<div id="question"></div>');
        $('body #question').append('<h2></h2>');
        $('body').append('<section class="options col-sm-6"></section>');
        $('body section').append('<ul></ul>');
        for (let i = 1; i <= MAX_OPTS; i++) {
            $('body section ul').append('<div id="' + i + '"></div>');
            $('body section ul #' + i).append('<li></li>');
        }

		$('body').append('<p id="score">');
        $('#score').append('<span id="hits" >Hits: ' + hits + ' </span>');
        $('#score').append('<span id="fails" > Fails: ' + fails + ' </span>');
    }

    //En cada ronda hay una pregunta de cada categoría


    function initializeTimer() {
        $('body').append('<div id="c_time" class="cab-block"></div>');
        $('body #c_time').append('<div id="myProgress"></div>');
        $('body #c_time #myProgress').append('<div id="myBar"></div>');
        $('body #c_time').append('<h3 id="time"></h3>');
    }


    function createQuestion() {

        countdown();
        //El id de la pregunta es aleatorio    
        idQuest = getRandomInt(0, MAX_QUEST - 1);
        $('.options div').css("background-color", "orange");
        $('#question h2').html(quiz[categories[idCat]][idQuest].question);
        for (let i = 1; i <= MAX_OPTS; i++) {
            let id = '.options #' + i + ' li';

            $(id).html(quiz[categories[idCat]][idQuest].options[i - 1]);


        }

    }

    //funcion countdown
    function countdown() {
        //inicializacion del countdown
        var width = 0;
        var elem = document.getElementById("myBar");

        elem.style.width = '0%';
        interval = setInterval(function() {
            width = timeBar * (100 / MAX_TIME);
            elem.style.width = width + '%';

            //Si se acaba el countdown se cambia de pregunta
            if (timeBar >= MAX_TIME) {
                //se limpia el Interval
                clearInterval(interval);
                updateFails();
                nextQuestion();
            } else {
                timeBar++;
            }

        }, 1000);
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

    function nextQuestion() {
        idCat++; //Se cambia de categoría
        if (idCat < MAX_CAT) {
            createQuestion();
            timeBar = 0;
        } else {
            //Eliminar el DOM de pregunta y opciones y mostrar la puntuación total
            removeAll();
            showScore();
        }

    }

    function updateHits() {
        hits++;
        $('#hits').html('Hits: ' + hits);
    }

    function updateFails() {
        fails++;
        $('#fails').html(' Fails: ' + fails);
    }



    var updatePoints = function(){
        window.JSInterface.updatePnts(hits, 0, "AM", currentL);
    }

    function addListeners() {
        /*Ahora se añade el listener a los clicks del jugador sobre las opciones*/
        $(".options div").click(function() {
            //Cuando pulsen una pregunta se comprueba si es la correcta
            if (this.id === quiz[categories[idCat]][idQuest].answer) {
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





