import * as $ from 'jquery'
import Mustache from 'mustache'

$('.table-editable-add').each(function (index) {
    let btn = $(this)
    let target = btn.data('target')

    btn.on('click', function () {
        let template = $('#' + target + '-add-template').html()
        console.log(template)
        Mustache.parse(template)
        let rendered = Mustache.render(template, {
            indice: $('#' + target + '-lignes tr').length + 1
        })
        $('#' + target + '-lignes').prepend(rendered)
        $('.' + target + '-delete').on('click', function () {
            $(this).parent().parent().remove()
        })
    })

    $('.' + target + '-delete').on('click', function () {
        console.log('delete')
        $(this).parent().parent().remove()
    })
})
