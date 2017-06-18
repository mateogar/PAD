var rounds = 5;
var round = 2;
var cont = 0;
var num;
var acertado = false;
var acerts = 0;
var numPhases = 0;
var fails = 0;
var images = ['img/first.png', 'img/second.png'];
var img = true;
var NUM_SEG_COUNT = 5 * 10; //ds
var id;
var levels = { "EASY": 2, "MEDIUM": 3, "HARD": 4 };

var levels = ['LOW', 'MEDIUM', 'HIGH'];
var level;

var currentRound = 0;







window.onload = function() {
    let levelURL = document.URL.split("?")[1];
    let levelEnd = levelURL.split("=");
    if(levelEnd[0]=="level"){
        levelEnd = levelEnd[1];
    }
    startGame(levelEnd);
}

var startGame = function(lvl) {
    initializeHeader();
    initializeVariables(lvl);
    showRules();


}

var initGame = function() {
    window.JSInterface.putFullLayout();
    $('.rules').remove();
    //move();
    initTemplate();
    playGame();
}

function initTemplate() {
    let html = '';
    html = `<div id="c_main" class="text-center container">
        <div id="cab_game">
        </div>
        <div id="table_cont">
            <table id="gamecontainer" class="fullscreen"></table>
        </div>
    </div>`;

    $('body').append(html);
}


function initializeHeader() {
    // $('body').append('<div id="c_time" class="cab-block"></div>');
    // $('body #c_time').append('<div id="myProgress"></div>');
    // $('body #c_time #myProgress').append('<div id="myBar"></div>');
    // $('body').append('<h3 id="totalHits">Hits: 0 </h3>');
    // html = '<div class="row">';
    let html = '';
    html = '<div class="row">';
    html += '<div id="rounds" class="header-alert alert alert-info col-xs-4"><strong>Round:0</strong> </div>';
    html += '<div id="fails" class="header-alert alert alert-danger col-xs-4"><strong>Fails:0</strong> </div>';
    html += '<div id="success" class="header-alert alert alert-success col-xs-4"><strong>Hits:0</strong></div>';
    html += '</div>';
    $('body').append(html);




}

function showRules() {
    let html = '';
    html = '<div class="row rules">';
    html += '<div id="info-rules" class="alert alert-warning col-xs-12">';
    html += '<h3> Find the odd picture. Be quick every second counts. </h3>';
    html += '</div><button id="rules-btn" class="btn-block btn-primary" onclick="initGame()">Start!</button>';
    html += '</div>';
    $('body').append(html);
}

var initializeRound = function() {

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
        round = 4;
        level = levels[2];
    }
}



var startRound = function() {
    updateRounds();
    var image = Math.round(Math.random());
    $("#gamecontainer").empty();
    var i, j;
    var w = Math.floor(100 / (round * 2));
    for (i = 0; i < round * 2; i++) {
        $("#gamecontainer").append("<tr>");
        for (j = 0; j < round * 2; j++) {
            $("#gamecontainer").append("<td><input type='image' src='" + images[image] + "' class='square' id='sq" + cont + "' onclick='pulsado(event);' style='width:" + w + "%'></input></td>");
            cont++;
        }
        $("#gamecontainer").append("</tr>");
    }
    num = Math.round(Math.random() * (Math.pow(round * 2, 2) - 1));
    var other = images[Math.abs(image - 1)];
    $("#sq" + num).attr("src", other);
}


var updateRounds = function() {
    currentRound++;
    $('#rounds').html('Round: ' + currentRound);
}

var updateHits = function() {
    acerts++;
    $('#success').html('Hits: ' + acerts);
}

var updateFails = function() {
    fails++;
    $('#fails').html('Fails: ' + fails);
}

var pulsado = function(e) {
    var boton = e.target;
    var id = boton.id;
    var identF = id.substr(2, id.length);
    if (identF == num) {
        updateHits();

        //document.getElementById('t-acert').innerHTML = acerts;
    } else {
        updateFails();
        // fails++;
        // document.getElementById('t-fail').innerHTML = fails;
    }
    if (numPhases < rounds) {
        playGame();
    } else {
        clearInterval(id);
        finish();
    }
}

var removeAll = function() {
    document.getElementById("c_main").remove();
    document.getElementById("myProgress").remove();
}

function finish() {

    removeAll();




    // var recPoints = getRecord();
    // if (acerts > recPoints) {
    //     updatePoints();
    // }





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


// var showStats = function() {
//     document.getElementById("c_main").innerHTML = "<div id='stat_name' class='g-block'><p> UserName</p></div><div id='stat_ok' class='g-block'><p><span class='glyphicon glyphicon-ok col-sm-6'></span> Corrects: " + acerts + "</p></div><div id='stat_wr' class='g-block'><p><span class='glyphicon glyphicon-remove col-sm-6'></span> Wrongs: " + fails + "</p></div>";
//     updatePoints();
// }

// //funcion countdown
// function move() {
//     //inicializaci?n del contdown
//     var elem = document.getElementById("myBar");
//     elem.style.width = '0%';
//     var count = 1;
//     id = setInterval(frame, 1000);

//     function frame() {
//         if (count > NUM_SEG_COUNT) {
//             //se limpia el Interval
//             clearInterval(id);
//             fails++;
//             //se llama de nuevo a jugar si quedan rondas
//             if (numPhases < rounds) {
//                 document.getElementById('t-fail').innerHTML = fails;
//                 playGame();
//             } else {
//                 clearInterval(id);
//                 showStats();
//             }
//         } else {
//             width = count * (100 / NUM_SEG_COUNT);
//             elem.style.width = width + '%';
//             count++;
//         }
//     }
// }

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

            //se limpia el Interval
            clearInterval(id);
            //se a?ade uno err?neo
            // var l_fail = document.getElementById("t-fail");
            // var ant;
            // ant = l_fail.textContent;
            // ant++;
            // l_fail.innerHTML = ant;
            // fails++;

            //se llama de nuevo a jugar si quedan rondas
            if (rounds > numPhases)
                playGame();
            else
                finish();
        }
        count--;
    }
}

var playGame = function() {
    clearInterval(id);
    initializeRound();
    startRound();
    //llamar funcion countdown
    move();
}






//Comunicación con android
//
var updatePoints = function() {
    window.JSInterface.updatePnts(acerts, fails, "PG", level);
}

var getRecord = function() {
    return window.JSInterface.getRecord("PG", level);
}

var share = function() {
    window.JSInterface.share(acerts, "PG", level);
}
