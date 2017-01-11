$(function () {
    console.log("ELAAA, KOM JE SNUISTEREN IN MIJN CODE? ❤️");

    // Menu op top
    var viewportHeight = $(window).height();
    var menuHeight = $('.mainnav').outerHeight();

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > viewportHeight) {
            $('.mainnav').addClass('fixed');
            $('.mainnav').next().css('margin-top', menuHeight);
        } else {
            $('.mainnav').removeClass('fixed');
            $('.mainnav').next().css('margin-top', '0px');
        }
    });

    $(".mainnav a").on('click', function(event) {
      var selectedElement = $(this).data("element");

      if(selectedElement == "contact") {
        $("." + selectedElement).css("padding-top", menuHeight + 50);
      } else {
        $("." + selectedElement).css("padding-top", menuHeight);
      }
    });
});
