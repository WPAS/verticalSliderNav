$(document).ready(function () {    
    
//    ************************
//        MOBILE
//    ************************
    function hideMobileMenu() {
      $('.slideIt').slideUp('slow', function() {
        $('.menu ul').removeClass('mobilestyle');
      });
    }
     
    $('.mobilenav').click(function() {
      if ($('.menu ul').hasClass('mobilestyle')) {
        hideMobileMenu();
      } else {
        $('.menu ul').addClass('mobilestyle');
        $('.slideIt').slideDown('slow');
      }
      $('.menu ul').removeClass('navbar');
    });

    $(window).resize(function() {
      if($(window).width() > 800) {
        $('.slideIt').css('display', 'block');
      }
    })  

    
//    ********************************
//        SCROLLING
//    ******************************** 

    
    var blocksLinks = $('.navigation').find('a');
    var allBlocks = blocksLinks.map(function () {
      var block = $($(this).attr('href'));
      if (block.length) {
        return block;
      }
    });   
    

    $('a[href^="#"]').on('click', function (e) {        
      e.preventDefault();
      var mobileFix = $(window).width() > 800 ? 0 : 25;
      var blockId = $(this).attr('href');
      var distanceToTop = $(blockId).offset().top;
      $('html, body').stop().animate({
        scrollTop: distanceToTop - mobileFix
      }, 1000);
      
      if($(window).width() < 801) {
        hideMobileMenu();  
      }

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
    
      var watchedBlocks = allBlocks.map(function () {
        if ($(this).offset().top < fromTop) {
          return this;
      }
        });

      var currentBlock = watchedBlocks[watchedBlocks.length - 1];
      var id = currentBlock && currentBlock.length ? currentBlock[0].id : "";
      var lastBlock = '';
      
      if (lastBlock !== id) {
        lastBlock = id;

        blocksLinks.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
      }
    });
});