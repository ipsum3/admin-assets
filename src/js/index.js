import 'popper.js'
import * as $ from 'jquery'
import 'bootstrap'
import './sortable'
import 'mustache'
import './modal'
import './media'

// import log from './log.js'

if (process.env.NODE_ENV !== 'production') {
    console.log('We are in development mode !')
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
