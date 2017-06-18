    'use strict';

    /*Creamos el HTML*/
    const html = '<tr><td> <div id="1" class="blue-box"></div></td><td> <div id="2" class="blue-box"></div></td><td> <div id="3" class="blue-box"></div></td><td> <div id="4" class="blue-box"></div></td><td> <div id="5" class="blue-box"></div></td><td> <div id="6" class="blue-box"></div></td><td> <div id="7" class="blue-box"></div></td><td> <div id="8" class="blue-box"></div></td><td> <div id="9" class="blue-box"></div></td><td> <div id="10" class="blue-box"></div></td></tr><tr><td> <div id="11" class="blue-box"></div></td><td> <div id="12" class="blue-box"></div></td><td> <div id="13" class="blue-box"></div></td><td> <div id="14" class="blue-box"></div></td><td> <div id="15" class="blue-box"></div></td><td> <div id="16" class="blue-box"></div></td><td> <div id="17" class="blue-box"></div></td><td> <div id="18" class="blue-box"></div></td><td> <div id="19" class="blue-box"></div></td><td> <div id="20" class="blue-box"></div></td></tr><tr><td> <div id="21" class="blue-box"></div></td><td> <div id="22" class="blue-box"></div></td><td> <div id="23" class="blue-box"></div></td><td> <div id="24" class="blue-box"></div></td><td> <div id="25" class="blue-box"></div></td><td> <div id="26" class="blue-box"></div></td><td> <div id="27" class="blue-box"></div></td><td> <div id="28" class="blue-box"></div></td><td> <div id="29" class="blue-box"></div></td><td> <div id="30" class="blue-box"></div></td></tr><tr><td> <div id="31" class="blue-box"></div></td><td> <div id="32" class="blue-box"></div></td><td> <div id="33" class="blue-box"></div></td><td> <div id="34" class="blue-box"></div></td><td> <div id="35" class="blue-box"></div></td><td> <div id="36" class="blue-box"></div></td><td> <div id="37" class="blue-box"></div></td><td> <div id="38" class="blue-box"></div></td><td> <div id="39" class="blue-box"></div></td><td> <div id="40" class="blue-box"></div></td></tr><tr><td> <div id="41" class="blue-box"></div></td><td> <div id="42" class="blue-box"></div></td><td> <div id="43" class="blue-box"></div></td><td> <div id="44" class="blue-box"></div></td><td> <div id="45" class="blue-box"></div></td><td> <div id="46" class="blue-box"></div></td><td> <div id="47" class="blue-box"></div></td><td> <div id="48" class="blue-box"></div></td><td> <div id="49" class="blue-box"></div></td><td> <div id="50" class="blue-box"></div></td></tr>';
    var maxBoxes = 50;
    var level = ['LOW', 'MEDIUM', 'HIGH'];

    var currentL;
    //Booleano usado para aumentar el número de targets cada 2 rondas
    var addTargets = false;
    //Aciertos de la partida.
    var totalHits = 0;
    //Segundos que han pasado desde iniciarse el timer.
    var timeBar = 0;
    var rounds = 0;
    //Segundos que dura una ronda.
    var NUM_SEG_COUNT = 30 * 10; //ds
    //Objetivos que le faltan por pulsar esta ronda
    var targetsLeft;

    var failsInRound;
    var ids;
    var visibleBoxes;
    var targetBoxes;
    var clickTime;
    var generalLevel;

    /*
    Cantidad de cajas visibles, se aumentará en 1 cada ronda.
     */
    var hiddenBoxes = 35;
    /*Objetivos esta ronda
    Se aumenta en 1 cada 2 rondas.
    */
    var targets = 3;
    //Fallos máximos en una ronda
    var MAX_FAILS_ROUND = 3;

    //al cargar la pantalla se llama a la funci?n principal del juego
    window.onload = function() {
        initLevel();
        startGame();
    }

    function initLevel() {



        generalLevel = window.JSInterface.loadLevel();
        // generalLevel = "MEDIUM";

    }

    function startGame() {
        let currentLevel = generalLevel;
        // initializeTemplate();

        let levelURL = document.URL.split("?")[1];
        let levelEnd = levelURL.split("=");
        if (levelEnd[0] == "level") {
            levelEnd = levelEnd[1];
        }
        initializeVariables(levelEnd);
        initializeTemplate();
        // initializeVariables(generalLevel);
        showRules();
        // move();
        // initializeRound();

    }

    function initializeTemplate() {
        // $('body').append('<div id="c_time" class="cab-block"></div>');
        // $('body #c_time').append('<div id="myProgress"></div>');
        // $('body #c_time #myProgress').append('<div id="myBar"></div>');
        // $('body').append('<h3 id="totalHits">Hits: 0 </h3>');
        // html = '<div class="row">';
        let html = '';
        html = '<div class="row">';
        html += '<div id="rounds" class=" header-alert alert alert-info col-xs-4"><strong>Round:</strong> </div>';
        html += '<div id="targetCounter" class="header-alert alert alert-success col-xs-4"><strong>Left In Round:</strong> </div>';
        html += '<div id="success" class="header-alert alert alert-success col-xs-4"><strong>Hits:</strong></div>';
        html += '</div>';
        $('body').append(html);


    }

    function showRules() {
        let html = '';
        html = '<div class="row rules">';
        html += '<div id="info-rules" class="alert alert-warning col-xs-12">';
        html += '<h3>Remember the cells whose color change to <span class="red">RED</span>.Then search and click them as fast as you can</h3>';
        html += '</div><button id="rules-btn" class="btn-block btn-primary" onclick="initGame()">Start!</button>';
        html += '</div>';
        $('body').append(html);
    }

    /*
        Se llama a este método cuando acierta un target.
         */
    function updateTargetCounter() {

        targetsLeft--;
        totalHits++;
        $('#targetCounter').html('Left In Round: ' + targetsLeft);
        $('#success').html('Hits: ' + totalHits);
        if (targetsLeft === 0) {
            nextRound();



        }
    }

    /*
    Se llama a este método cuando pulsa a un box que no es target.
     */
    function updateFailsCounter() {
        failsInRound++;
        $('#failCounter').html('Fails in round: ' + failsInRound);
        //Si falla MAX_FAILS_ROUND se cambia el tablero
        if (failsInRound >= MAX_FAILS_ROUND) {
            nextRound();
        }

    }

    function updateRoundCounter() {
        rounds++;
        $('#rounds').html('Round: ' + rounds);
        $('#targetCounter').html('Left In Round: ' + targets);
    }



    function initGame() {
        window.JSInterface.putFullLayout();
        $('.rules').remove();
        move();
        initializeRound();
    }


    //funcion move
    function move() {
        var elem = document.getElementById("myBar");
        elem.style.width = '100%';
        var count = NUM_SEG_COUNT;
        let id = setInterval(frame, 100);

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
                elem.style.width = '0%';
                clearInterval(id);
                finish();
                //updateFails();
                //nextQuestion();
            }
            count--;
        }
    }

    function finish() {

        $('#board').remove();

        var recPoints = getRecord();
        if (totalHits > recPoints)
            updatePoints();





        let html = '<div class="row">';
        html += '<div id="finish" class="alert alert-warning col-xs-12">The time has finished.<strong> You got ' + totalHits + ' hits</strong>';
        html += ' Well done!</div>';
        html += '</div>';
        $('body').append(html);
        html = '<div class="row">';
        html += '<button id="share" class="btn-block btn-primary" onclick="share()">Share your score!</button>';
        html += '</div>';
        $('body').append(html);
        window.JSInterface.putGeneralLayout();
    }







    function initializeRound() {
        targetsLeft = targets;
        updateRoundCounter();
        failsInRound = 0;
        clickTime = false;
        targetBoxes = [];
        visibleBoxes = [];
        ids = [];
        initializeBoard();
        /*Escondemos 'hiddenBoxes' elementos*/

        hideBoxes();

        /*y cambiamos el color de otros 'targets' */
        var timeoutId = setTimeout(function() {
            colorBoxes();

            clearTimeout(timeoutId);
        }, 200);

        /*Devolvemos el color original a las cajas*/
        var timeoutId2 = setTimeout(function() {
            returnColorBoxes();
            clickTime = true;
            clearTimeout(timeoutId2);
        }, 1100);

        addListeners();


    }

    function deleteBoard() {
        $('#board-div').remove();

    }

    function initializeBoard() {
        $('body').append('<div id="board-div" class="row"> </div>');
        $('#board-div').append('<section class="col-xs-12"> </section>');
        $('#board-div section').append('<table id="board" class="table table-hover"></table>');
        //$('body').append('<h3 class="counter" id="targetCounter">Left:' + targetsLeft + ' </h3>');
        //$('body').append('<h3 class="counter" id="failCounter">Fails in round:' + failsInRound + ' </h3>');
        $("#board").append(html);

        /*Este timeout genera la transición para que las cajas aparezcan despacio*/
        var timeout = setTimeout(function() {
            for (var i = 1; i < 51; i++) {
                $('#board #' + i).addClass('blue-box-hover');
            }
            clearTimeout(timeout);
        }, 0);

    }





    function nextRound() {
        /*Se inicia la siguiente ronda con unos segundos de delay*/
        var timeout = setTimeout(function() {

            //Tras cada ronda se aumenta el número de boxes visibles
            if (hiddenBoxes > 0)
                hiddenBoxes--;
            //Cada 2 rondas se aumenta el número de targets
            if (addTargets) {
                targets++;
                addTargets = false;
            } else
                addTargets = true;

            deleteBoard();
            initializeRound();
            clearTimeout(timeout);

        }, 100);
    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillIds() {
        for (var i = 0; i < maxBoxes; i++) {
            visibleBoxes[i] = i + 1;
        }
    }

    function removeElement(array, elem) {
        var index = array.indexOf(+elem);
        array.splice(index, 1);
    }

    function returnColorBoxes() {
        var elem;
        for (var i = 0; i < targets; i++) {
            elem = targetBoxes[i];
            $('#board #' + elem).removeClass('red-box');
            $('#board #' + elem).addClass('blue-box');
        }
    }

    function colorBoxes() {

        /*En visibleBoxes tenenmos los elementos visibles*/
        var temp = [];
        var id;
        var elem;
        var valid;
        /*Se buscan targets elementos en el array */
        for (var i = 0; i < targets; i++) {
            id = getRandomInt(0, visibleBoxes.length - 1);
            elem = visibleBoxes[id];
            removeElement(visibleBoxes, elem);
            targetBoxes.push(elem);
            /*$('#board #' + elem).attr('background-color', 'red');*/
            $('#board #' + elem).removeClass('blue-box');
            $('#board #' + elem).addClass('red-box');
        }

    }

    function hideBoxes() {
        fillIds();
        ids = [];
        var elem = 0;
        var valid;
        for (var i = 0; i < hiddenBoxes; i++) {
            /*Pedimos nº aleatorios hasta que es válido*/
            valid = false;
            while (!valid) {
                elem = getRandomInt(1, maxBoxes);

                if (!inArray(ids, elem)) {
                    valid = true;
                    ids.push(elem);
                    removeElement(visibleBoxes, elem);
                }
            }

            $('#board #' + elem).hide();
        }


    }





    function inArray(array, elem) {
        var i = array.length;
        while (i--) {
            if (+array[i] === +elem) {
                return true;
            }
        }
        return false;
    }





    function addListeners() {
        /*Ahora se añade el listener a los clicks del jugador sobre las cajas*/
        $("#board .blue-box").click(function() {
            /*1-Si la caja pulsado era un target se resta el contador
                            2- Se le cambia el color 
                            3- Si le saca del array targetBoxes (Al sacarle de aquí si vuelve a pulsar no hará nada);
        
                            */
            //Si ya ha comenzado la ronda y el botón no ha sido ya pulsado
            if (clickTime && !($(this).hasClass("red-box") || $(this).hasClass("gray-box"))) {
                //Si era un target
                if (inArray(targetBoxes, this.id)) {
                    removeElement(targetBoxes, this.id);
                    $('#board #' + this.id).removeClass('blue-box');

                    $('#board #' + this.id).addClass('red-box');
                    updateTargetCounter();
                }
                //Si no es un target
                else {
                    $('#board #' + this.id).removeClass('blue-box');
                    $('#board #' + this.id).addClass('gray-box');
                    updateFailsCounter();
                }

            }

        });
    }

    function initializeVariables(currentLevel) {
        if (currentLevel === level[0]) {
            currentL = level[0];
            hiddenBoxes = 38;
            targets = 2;
            MAX_FAILS_ROUND = 3;
        } else if (currentLevel === level[1]) {
            hiddenBoxes = 35;
            targets = 3;
            MAX_FAILS_ROUND = 3;
            currentL = level[1];
        } else {
            hiddenBoxes = 33;
            targets = 4;
            MAX_FAILS_ROUND = 2;
            currentL = level[2];
        }
    }

    var share = function() {
        window.JSInterface.share(totalHits, "MG", currentL);
    }

    var updatePoints = function() {
        window.JSInterface.updatePnts(totalHits, 0, "MG", currentL);
    }

    var getRecord = function() {
        return window.JSInterface.getRecord("MG", currentL);
    }
