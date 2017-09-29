$(document).ready(function () {    
    
//    ************************
//        MOBILE
//    ************************
    
    $('.mobilenav').click(function() {            
        $('.menu ul').toggleClass('mobilestyle');
        $('.menu ul').removeClass('navbar');
    }); 

    
//    ********************************
//        SCROLLING
//    ******************************** 

    
    var sectionsLinks = $('.navigation').find('a');
    var allSections = sectionsLinks.map(function () {
        var section = $($(this).attr('href'));
        if (section.length) {
            return section;
        }
    });   
    

    $('a[href^="#"]').on('click', function (e) {        
        e.preventDefault();
        var mobileFix = $(window).width() > 800 ? 0 : 25;
        var sectionId = $(this).attr('href');
        var distanceToTop = $(sectionId).offset().top;
        $('html, body').stop().animate({
            scrollTop: distanceToTop - mobileFix
        }, 1000);
        $('.menu ul').removeClass('mobilestyle');
    });
   
//    ********************************
//        SIDE MENU 
//    ********************************     
    
    
    var showSideMenu = function(fromTop) {
        if (fromTop > 20) {            
            $('.navigation').addClass('navbar');
        } else {
            $('.navigation').removeClass('navbar');
        }
    };
    
    $(window).scroll(function () {        
        var fromTop = $(this).scrollTop()+10;

        if ($(window).width() > 800) {
            showSideMenu(fromTop);
        }
    
        var watchedSections = allSections.map(function () {
                if ($(this).offset().top < fromTop) {
                    return this;
            }
        });

        var currentSection = watchedSections[watchedSections.length - 1];
        var id = currentSection && currentSection.length ? currentSection[0].id : "";
        var lastSection = '';
        
        if (lastSection !== id) {
            lastSection = id;

            sectionsLinks.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
        }

    });
    

});