'use strict';




var hover1 = false;
var hover2 = false;
var hover3 = false;
var hover4 = false;
var intervalId = null;

console.log(this.id);
var id = this.id;
changeStateById(this.id, true);
var cont = 2;

$("#interests img").mouseover(function() {
    var that = this;
    $('#interests div article img').each(function(index, elem) {
        if (elem.id != that.id)
            $(elem).parent().addClass('article-none');

    });



    intervalId = setInterval(function() {
        console.log(that);
        var src = "Images/" + that.id + cont + ".jpg";
        $(that).attr("src", src);
        cont++;
        if (cont > 4) {
            cont = 1;
        }



    }, 1200);

});


$("#interests img").mouseout(function() {
    var that = this;
    $('#interests div article img').each(function(index, elem) {
        if (elem.id != that.id)
            $(elem).parent().removeClass('article-none');

    });
    changeStateById(this.id, false);
    clearInterval(intervalId);
});


function getHover(id) {
    switch (id) {
        case 'sports':
            return hover1;
            break;
        case 'cinema':
            return hover2;
            break;
        case 'travelling':
            return hover3;
            break;
        case 'videogames':
            return hover4;
            break;
        default:
            console.log('error');
    }
}

function changeStateById(id, state) {
    switch (id) {
        case 'sports':
            hover1 = state;
            break;
        case 'cinema':
            hover2 = state;
            break;
        case 'travelling':
            hover3 = state;
            break;
        case 'videogames':
            hover4 = !state;
            break;
        default:
            console.log('error');
    }

}
