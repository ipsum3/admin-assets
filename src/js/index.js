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
})
