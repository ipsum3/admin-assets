import * as $ from 'jquery'

$(function () {
    $('#hamburger').click(function (e) {
        if (!$('body').hasClass('menu-is-open')) {
            $('body').addClass('menu-is-open')
            $('.main').click(function () {
                menuClose()
            })
        } else {
            menuClose()
        }
    })
    function menuClose () {
        $('body').removeClass('menu-is-open')
        $('.main').off('click')
    }
})
