'use strict';

$(document).ready(function() {

    $(document).on('click', 'a[href*="#"]', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });

});


var active;
document.querySelectorAll('a[href*="#"]').forEach(function(elem) {
    elem.addEventListener('click', function() {
        if (active) {
            $(active).parent().removeClass('nav-item--active');
        }

        $(this).parent().addClass('nav-item--active');
        active = this;
    });
});
