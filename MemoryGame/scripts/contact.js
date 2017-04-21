var good = false;
var bad = false;


$("select").change(function() {
    console.log($("#reason").val());

    if ($("#reason").val() === "awesome" || $("#reason").val() === "fantastic") {

        $('#contact button').removeAttr('disabled');
        if (!good) {
            $("#contact-cuestion").append('<label id="new-label">I knew it</label>');
            good = true;
        }
        if (bad) {
            $("#contact-cuestion #contact-div").remove();
            $("#contact-cuestion .flex-col").remove();
            bad = false;
        }
    } else if ($("#reason").val() === "nothing") {
        removeAll();
        good = false;
        bad = false;
    } else {
        /*Elimina la etiqueta I knew it*/
        var target = getRandomInt(1, 10);
        if (!bad) {
            var src = "Images/Partners/" + target + ".jpg";
            $("#contact-cuestion").append('<div id="contact-div" class="row"> ');
            $("#contact-cuestion #contact-div").append('<label id="bad-label">Maybe, the person you are looking for is</label>');
            $("#contact-cuestion #contact-div").append('<i class="my-icon material-icons">arrow_forward</i>');
            $("#contact-cuestion #contact-div").append('<img id="bad-person" class="img-size" src="' + src + '">');
            $("#contact-cuestion .flex-col").append('<a href="#bad-person></a>');
            bad = true;

            $('html, body').animate({
                scrollTop: $('#bad-person').offset().top
            }, 1200);



            var timeoutId = setTimeout(function() {
                $("#contact-cuestion").append('<div class="flex-col">');
                $("#contact-cuestion .flex-col").append('<h3 id="label-javi">OR HIM!!!!</h3>');
                $("#contact-cuestion .flex-col").append('<i id="my-icon" class="material-icons ">arrow_downward</i>');
                $("#contact-cuestion .flex-col").append('<img id="result" class="img-javi img-javi-hover" src="Images/Partners/11.jpg">');
                $("#contact-cuestion .flex-col").append('<a href="#result></a>');

                $('html, body').animate({
                    scrollTop: $('#result').offset().top
                }, 1200);

                clearTimeout(timeoutId);
            }, 3000);

        }
        if (good) {;
            $('#contact-cuestion #new-label').remove();
            good = false;
        }
        $('#contact button').attr('disabled', '');
    }

});

function removeAll() {
    $('#contact-cuestion #new-label').remove();
    $("#contact-cuestion #contact-div").remove();
    $("#contact-cuestion .flex-col").remove();
    $('#contact button').attr('disabled', '');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
