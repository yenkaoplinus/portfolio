$(function () {
    console.log("HALLO YENKA ❤️");

    // Menu op top
    var viewportHeight = $(window).height();
    var menuHeight = $('.mainnav').outerHeight();

    console.log(menuHeight);

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > viewportHeight) {
            $('.mainnav').addClass('fixed');
            $('.mainnav').next().css('margin-top', menuHeight);
        } else {
            $('.mainnav').removeClass('fixed');
            $('.mainnav').next().css('margin-top', '0px');
        }
    });
});
