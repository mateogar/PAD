'use strict';


(function() {

    const categories = {
        0: 'Arte y Literatura'
    }

    let quiz;
    let idCat = 0;
    let idQuest = 0;
    const MAX_OPTS = 4;
    //Cargamos el json
    $.getJSON("scripts/questions.json", function(json) {
        quiz = json;
        startGame();
        addListeners();
    });


    function startGame() {
        createQuestion();
    }

    function createQuestion() {
        $('#question h2').html(quiz[categories[idCat]][idQuest].question);
        for (let i = 1; i <= MAX_OPTS; i++) {
            let id = '.options #' + i;
            $(id).html(quiz[categories[idCat]][idQuest].options[i - 1]);
        }

    }


    function addListeners() {
        /*Ahora se añade el listener a los clicks del jugador sobre las opciones*/
        $(".options div").click(function() {
            //Cuando pulsen una pregunta se comprueba si es la correcta
            if (this.id === quiz[categories[idCat]][idQuest].answer) {
                $(this).css("background-color", "green");
            } else {
                $(this).css("background-color", "red");
            }

        });
    }





})();
