'use strict';


(function() {

    /*Creamos el HTML*/
    var idCont = 1;
    var html = '<tr><td> <div id="1" class="blue-box"></div></td><td> <div id="2" class="blue-box"></div></td><td> <div id="3" class="blue-box"></div></td><td> <div id="4" class="blue-box"></div></td><td> <div id="5" class="blue-box"></div></td><td> <div id="6" class="blue-box"></div></td><td> <div id="7" class="blue-box"></div></td><td> <div id="8" class="blue-box"></div></td><td> <div id="9" class="blue-box"></div></td><td> <div id="10" class="blue-box"></div></td></tr><tr><td> <div id="11" class="blue-box"></div></td><td> <div id="12" class="blue-box"></div></td><td> <div id="13" class="blue-box"></div></td><td> <div id="14" class="blue-box"></div></td><td> <div id="15" class="blue-box"></div></td><td> <div id="16" class="blue-box"></div></td><td> <div id="17" class="blue-box"></div></td><td> <div id="18" class="blue-box"></div></td><td> <div id="19" class="blue-box"></div></td><td> <div id="20" class="blue-box"></div></td></tr><tr><td> <div id="21" class="blue-box"></div></td><td> <div id="22" class="blue-box"></div></td><td> <div id="23" class="blue-box"></div></td><td> <div id="24" class="blue-box"></div></td><td> <div id="25" class="blue-box"></div></td><td> <div id="26" class="blue-box"></div></td><td> <div id="27" class="blue-box"></div></td><td> <div id="28" class="blue-box"></div></td><td> <div id="29" class="blue-box"></div></td><td> <div id="30" class="blue-box"></div></td></tr><tr><td> <div id="31" class="blue-box"></div></td><td> <div id="32" class="blue-box"></div></td><td> <div id="33" class="blue-box"></div></td><td> <div id="34" class="blue-box"></div></td><td> <div id="35" class="blue-box"></div></td><td> <div id="36" class="blue-box"></div></td><td> <div id="37" class="blue-box"></div></td><td> <div id="38" class="blue-box"></div></td><td> <div id="39" class="blue-box"></div></td><td> <div id="40" class="blue-box"></div></td></tr><tr><td> <div id="41" class="blue-box"></div></td><td> <div id="42" class="blue-box"></div></td><td> <div id="43" class="blue-box"></div></td><td> <div id="44" class="blue-box"></div></td><td> <div id="45" class="blue-box"></div></td><td> <div id="46" class="blue-box"></div></td><td> <div id="47" class="blue-box"></div></td><td> <div id="48" class="blue-box"></div></td><td> <div id="49" class="blue-box"></div></td><td> <div id="50" class="blue-box"></div></td></tr>';
    var maxBoxes = 50;
    var hiddenBoxes = 35;
    //Objetivos esta ronda
    var targets = 3;
    //Objetivos que le faltan por pulsar esta ronda
    var targetsLeft = 3;
    var MAX_FAILS_ROUND = 3;
    var failsInRound = 0;
    var ids = [];
    var visibleBoxes = [];
    var targetBoxes = [];
    var clickTime = false;

    $(document).ready(function() {
        initializeRound();

    });

    function initializeRound() {
        targetsLeft = targets;
        failsInRound = 0;
        clickTime = false;
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
        $('#board').remove();
        $('#targetCounter').remove();
        $('#failCounter').remove();
    }

    function initializeBoard() {

        $('body').append('<table id="board" class="table table-hover"></table>');
        $('body').append('<h3 id="targetCounter">Left:' + targetsLeft + ' </h3>');
        $('body').append('<h3 id="failCounter">Fails:' + failsInRound + ' </h3>');
        $("#board").append(html);


    }

    function updateTargetCounter() {
        targetsLeft--;
        $('#targetCounter').html('Left: ' + targetsLeft);
        if (targetsLeft === 0) {
            deleteBoard();
            /*Se inicia la siguiente ronda con unos segundos de delay*/
            var timeout = setTimeout(function() {
                initializeRound();
                clearTimeout(timeout);

            }, 100);

        }
    }

    function updateFailsCounter() {
        failsInRound++;
        $('#failCounter').html('Fails: ' + failsInRound);

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

})();
