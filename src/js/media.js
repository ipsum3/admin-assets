import * as $ from 'jquery'
import Mustache from 'mustache'
import Croppa from './croppa'

$('.media-add').on('click', function () {
    let $self = $(this)

    let template = $('#media-info-template').html()
    Mustache.parse(template)
    let rendered = Mustache.render(template, {
        titre: $(this).data('titre'),
        isImage: $self.data('isimage'),
        image: Croppa.url($self.data('path'), 130, 130),
        icone: $self.data('icone')
    })
    $('#media-info').html(rendered)

    $('#textarea-add').on('click', function () {
        let html = ''
        if ($self.data('isimage')) {
            let tailles = $('#taille').val().split('x')
            html = '<img alt="' + $self.data('alt') + '" src="' + Croppa.url($self.data('path'), tailles[0], tailles[1]) + '" class="' + $('#alignement').val() + '">'
        } else {
            html = '<a href="' + $self.data('path') + '">' + $self.data('titre') + '</a>'
        }

        window.parent.postMessage({
            mceAction: 'insertContent',
            content: html
        }, document.location.origin)

        window.parent.postMessage({
            mceAction: 'close'
        }, document.location.origin)
    })
})
