import * as $ from 'jquery'
import Mustache from 'mustache'
import { configTinymceSimple, configTinymce } from './tinymce_config'

$('#add-bloc_btn').click(function () {
    const type = $('#type_bloc').val()
    const articleid = $(this).data('article')
    if (type !== '') {
        console.log('add bloc ' + type)
        let template = $('#customBlocs-' + type + '-template').html()
        Mustache.parse(template)
        let rendered = Mustache.render(template, {
            indice: $('#blocs .bloc').length
        })
        rendered = rendered.replace(/publication_id=/g, 'publication_id=' + articleid).replace(/data-uploadpublicationid=""/g, 'data-uploadpublicationid="' + articleid + '"')
        $('#blocs').append(rendered)

        initMedia()
        removeBloc()
        copyCustomFieldRepeater()
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
    // Utilisation de la délégation d'événement pour éviter de réattacher sans cesse
    $(document).off('click', '.remove-bloc').on('click', '.remove-bloc', function () {
        const blocId = $(this).attr('id')
        if (confirm('Êtes-vous sûre de vouloir supprimer ce bloc ?') === true) {
            // Nettoyage de TinyMCE avant suppression pour éviter les fuites mémoire
            $(this).closest('.box').find('.tinymce, .tinymce-simple').each(function () {
                window.tinymce.remove('#' + this.id)
            })
            $('#bloc_' + blocId).remove()
        }
    })

    $(document).off('click', '.remove-repeater').on('click', '.remove-repeater', function () {
        $(this).closest('.sortable-item').remove()
    })
}

function copyCustomFieldRepeater () {
    $('.copy-custom-field-btn').off('click').on('click', function () {
        let dom = $(this).closest('.box')
        let template = $('#customFields-clone' + $(this).data('field_id') + '-template').html()
        Mustache.parse(template)

        let rendered = Mustache.render(template, {
            indice: dom.find('.field-group').length + Math.floor(Math.random() * 1000)
        })

        dom.find('.fields-bloc').append(rendered)

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
    const configs = [
        { selector: '.tinymce', config: configTinymce },
        { selector: '.tinymce-simple', config: configTinymceSimple }
    ]

    configs.forEach(({ selector, config }) => {
        $(selector).each(function () {
            const $el = $(this)

            // 1. On génère un ID unique si absent ou générique (ex: contenant "indice")
            if (!$el.attr('id') || $el.attr('id').indexOf('indice') !== -1) {
                const uniqueId = 'mce-' + Math.random().toString(36).substr(2, 9)
                $el.attr('id', uniqueId)
            }

            const id = $el.attr('id')

            // 2. CRUCIAL : Si une instance existe déjà pour cet ID, on la détruit proprement
            if (window.tinymce.get(id)) {
                window.tinymce.remove('#' + id)
            }

            // 3. On nettoie les résidus de l'interface visuelle (si un clone a copié le HTML de TinyMCE)
            $el.siblings('.tox-tinymce').remove()
            $el.show() // On s'assure que le textarea est visible avant l'init

            // 4. Initialisation toute neuve
            window.tinymce.init({
                ...config,
                target: this, // On cible l'élément DOM direct
                readonly: false, // On force le mode édition
                setup: function (editor) {
                    editor.on('init', function () {
                        // Petit hack pour forcer le focus et l'attribut d'édition
                        $(editor.getBody()).attr('contenteditable', true)
                    })
                    editor.on('change', function () {
                        editor.save() // Synchronise avec le textarea pour l'envoi du formulaire
                    })
                }
            })
        })
    })
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
        let val = $(this).data('uploadmedias')
        if (val && typeof val === 'string') {
            $(this).attr('data-uploadmedias', val.replace('publication_id=', 'publication_id=' + articleid))
            $(this).attr('data-uploadpublicationid', articleid)
        }
    })
}

$(document).ready(function () {
    completeMedia()
    initMedia()
    setTimeout(function () {
        createMediaInput()
        createTinymce()
    }, 500)

    $('.upload_custom').on('change', function () {
        setTimeout(function () {
            completeMedia()
            createMediaInput()
        }, 1000)
    })
})
