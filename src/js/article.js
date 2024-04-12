import * as $ from 'jquery'
import Mustache from 'mustache'
import { configTinymceSimple, configTinymce } from './tinymce_config'

$('#add-bloc_btn').click(function () {
    const type = $('#type_bloc').val()
    const articleid = $(this).data('article')
    if (type !== '') {
        window.tinymce.remove('.tinymce-simple')
        window.tinymce.remove('.tinymce')
        console.log('add bloc ' + type)
        let template = $('#customBlocs-' + type + '-template').html()
        Mustache.parse(template)
        let rendered = Mustache.render(template, {
            indice: $('#blocs .bloc').length
        })
        rendered = rendered.replace('publication_id=', 'publication_id=' + articleid).replace('data-uploadpublicationid=""', 'data-uploadpublicationid="' + articleid + '"')
        $('#blocs').append(rendered)

        initMedia()
        removeBloc()
        copyCustomFieldRepeater()
        // createMediaInput()
        $('.upload_custom').on('change', function () {
            setTimeout(function () { createMediaInput() }, 1000)
        })
        createTinymce()
    }
})

removeBloc()
copyCustomFieldRepeater()
moveTemplate()

function moveTemplate () {
    $('.x-tmpl-mustache').appendTo('body')
}

function removeBloc () {
    $('.remove-bloc').click(function () {
        const blocId = $(this).attr('id')
        // eslint-disable-next-line no-undef
        if (confirm('Êtes-vous sûre de vouloir supprimer ce bloc ?') === true) {
            $('#bloc_' + blocId).remove()
        }
    })

    $('.remove-repeater').click(function () {
        $(this).closest('.sortable-item').remove()
    })
}

function copyCustomFieldRepeater () {
    $('.copy-custom-field-btn').on('click', function () {
        window.tinymce.remove('.tinymce-simple')

        let dom = $(this).parent().parent().parent()
        let template = $('#customFields-clone' + $(this).data('field_id') + '-template').html()
        Mustache.parse(template)
        let rendered = Mustache.render(template, {
            indice: dom.find('.field-group').length
        })

        dom.find('.fields-bloc').append(rendered)
        removeBloc()

        initMedia()
        createMediaInput()
        createTinymce()
    })
}

function createMediaInput () {
    $('.upload_custom').each(function (index) {
        let dom = $(this)
        let uploadgroupe = $(this).data('uploadgroupe') + '[]'
        dom.find('.media').each(function (i) {
            console.log($(this).find('.media-img input').length)
            if ($(this).find('.media-img input').length === 0) {
                var sortableValue = $(this).data('sortable')
                var input = $('<input>').attr({
                    type: 'hidden',
                    name: uploadgroupe,
                    value: sortableValue
                })
                $(this).find('.media-img').append(input)
            }
        })
    })
}

function createTinymce () {
    window.tinymce.init(configTinymce)
    window.tinymce.init(configTinymceSimple)
}

function initMedia () {
    $('.upload_custom').each(function () {
        if (!$(this).data('initialized')) {
            window.uppyInit(this)
            $(this).data('initialized', true)
            if ($(this).find('.upload-DragDrop button').length > 1) {
                $(this).find('.upload-DragDrop button').first().remove()
            }
        }
    })
}

function completeMedia () {
    let articleid = $('#add-bloc_btn').data('article')
    $('.upload_custom').each(function (index) {
        $(this).attr('data-uploadmedias', $(this).data('uploadmedias').replace('publication_id=', 'publication_id=' + articleid))
        $(this).attr('data-uploadpublicationid', articleid)
    })
}

$(document).ready(function () {
    completeMedia()
    initMedia()
    setTimeout(function () {
        createMediaInput()
    }, 500)
    $('.upload_custom').on('change', function () {
        setTimeout(function () {
            completeMedia()
            createMediaInput()
        }, 1000)
    })
})
