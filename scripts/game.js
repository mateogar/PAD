'use strict';


(function() {

    /*Creamos el HTML*/
    var idCont = 1;
    var html = '';
    var maxBoxes = 50;
    var hiddenBoxes = 35;
    var colors = 3;
    var ids = [];
    var visibleBoxes = [];
    var targetBoxes = [];

    for (var i = 0; i < 5; i++) {

        html += '<tr>'

        for (var j = 0; j < 10; j++) {
            html += '<td> <div id="' + idCont + '" class="box"></div></td>';
            idCont++;
        }
        html += '</tr>';
    }

    $("#board").append(html);

    /*Escondemos 'hiddenBoxes' elementos*/

    hideBoxes();

    /*y cambiamos el color de otros 'colors' */
    var timeoutId = setTimeout(function() {
        colorBoxes();

        clearTimeout(timeoutId);
    }, 200);

    /*Devolvemos el color original a las cajas*/
    var timeoutId2 = setTimeout(function() {
        returnColorBoxes();

        clearTimeout(timeoutId2);
    }, 1100);

    /*Ahora se añade el listener a los clicks del jugador sobre las cajas*/




    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillIds() {
        for (var i = 0; i < maxBoxes; i++) {
            visibleBoxes[i] = i + 1;
        }
    }

    function removeElement(array, elem) {
        var index = array.indexOf(elem);
        array.splice(index, 1);
    }

    function returnColorBoxes() {
        var elem;
        for (var i = 0; i < colors; i++) {
            elem = targetBoxes[i];
            $('#board #' + elem).removeClass('red-box');
            $('#board #' + elem).addClass('box');
        }
    }

    function colorBoxes() {

        /*En visibleBoxes tenenmos los elementos visibles*/
        var temp = [];
        var id;
        var elem;
        var valid;
        /*Se buscan colors elementos en el array */
        for (var i = 0; i < colors; i++) {
            id = getRandomInt(0, visibleBoxes.length - 1);
            elem = visibleBoxes[id];
            removeElement(visibleBoxes, elem);
            targetBoxes.push(elem);
            /*$('#board #' + elem).attr('background-color', 'red');*/
            $('#board #' + elem).removeClass('box');
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
            if (array[i] === elem) {
                return true;
            }
        }
        return false;
    }

})();
