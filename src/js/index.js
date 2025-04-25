import 'popper.js'
import * as $ from 'jquery'
import 'bootstrap'
import './sortable'
import 'mustache'
import './modal'
import './media'
import './select2'
import './hamburger'
import './article'
import './datepicker'
import './table_editable'

// import log from './log.js'

if (process.env.NODE_ENV !== 'production') {
    console.log('We are in development mode !')
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()

    $('.btn-danger, .btn-outline-danger').click(function () {
        if ($(this).data('confirm') === false) {
            return true
        }
        if (!window.confirm('Souhaitez-vous confirmer ?')) {
            return false
        }
    })

    const $layout = $('.l-global')
    const $toggleButton = $('#sidebar-button')
    const $icon = $toggleButton.find('i')

    if (localStorage.getItem('sidebar-collapsed') === 'true') {
        $layout.addClass('sidebar-collapsed')
        $icon.removeClass('fa-angle-left').addClass('fa-angle-right')
    }

    $toggleButton.on('click', function () {
        $layout.toggleClass('sidebar-collapsed')

        const isCollapsed = $layout.hasClass('sidebar-collapsed')
        localStorage.setItem('sidebar-collapsed', isCollapsed)

        if (isCollapsed) {
            $icon.removeClass('fa-angle-left').addClass('fa-angle-right')
        } else {
            $icon.removeClass('fa-angle-right').addClass('fa-angle-left')
        }
    })
})
