'use strict';
$(function() {

    //메인 메뉴
    setGnb();
    function setGnb() {
        //PC
        $('#gnb > ul > li > a').on('mouseenter focus', function() {
            if ($(window).width() < 1181) return false;
            $('#header').addClass('on');
            $('#gnb > ul > li > ul').stop(true).slideDown(300);
        });
        $('#header').on('mouseleave', function() {
            if ($(window).width() < 1181) return false;
            $('#header').removeClass('on');
            $('#gnb > ul > li > ul').stop(true).slideUp(300);
        });
    }

    //메인 슬라이드
    setImageSlide('#main-visual div.main-visual-box', false, 3000);
    function setImageSlide(selector, status, speed) {
        var numSlide = $(selector).find('ul.slide li').length;
        var slideNow = 0;
        var slidePrev = 0;
        var slideNext = 0;
        var timerId = '';
        var timerSpeed = speed;
        var isTimerOn = status;
        var startX = 0;
        var startY = 0;
        var delX = 0;
        var delY = 0;
        var offsetX = 0;

        //초기화
        $(selector).find('ul.slide li').each(function(i) {
            $(selector).find('ul.indicator').append('<li><a href="#">' + (i + 1) + '번 슬라이드 보기</a></li>\n');
            $(this).css({'display': 'block', 'left': (i * 100) + '%'});
        });
        if (isTimerOn === true) {
            $('#main-visual a.play').addClass('on');
        } else {
            $('#main-visual a.play').removeClass('on');
        }
        showSlideAnimation(1);

        $(selector).find('a.prev').on('click', function() {
            $(this).stop(true).animate({'left': '-5px'}, 50).animate({'left': '10px'}, 100);
            showSlideAnimation(slidePrev);
        });
        $(selector).find('a.next').on('click', function() {
            $(this).stop(true).animate({'right': '-5px'}, 50).animate({'right': '10px'}, 100);
            showSlideAnimation(slideNext);
        });
        $(selector).find('ul.indicator li a').on('click', function() {
            var index = $('#main-visual ul.indicator li').index($(this).parent());
            showSlideAnimation(index + 1);
        });
        $('#main-visual a.play').on('click', function() {
            if (isTimerOn === true) {
                clearTimeout(timerId);
                $(this).removeClass('on');
                isTimerOn = false;
            } else {
                timerId = setTimeout(function() {showSlideAnimation(slideNext);}, timerSpeed);
                $(this).addClass('on');
                isTimerOn = true;
            }
        });

        function showSlideAnimation(n) {
            clearTimeout(timerId);
            if (slideNow === 0) {
                $(selector).find('div ul.slide').css({'transition': 'none','left': -((n - 1) * 100) + '%'});
            } else {
                $(selector).find('div ul.slide').css({'transition': 'left 0.3s', 'left': -((n - 1) * 100) + '%'});
            }
            $(selector).find('ul.indicator li').removeClass('on');
            $(selector).find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            slideNow = n;
            slidePrev = (n - 1) < 1 ? numSlide : n - 1;
            slideNext = (n + 1) > numSlide ? 1 : n + 1;
            if (isTimerOn === true) {
                timerId = setTimeout(function() {showSlideAnimation(slideNext);}, timerSpeed);
            }
        }
    }

});