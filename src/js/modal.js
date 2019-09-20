import * as $ from 'jquery'

// Initialisation
function load () {
    $('.trigger-modal').on('click', function () {
        let $element = $(this)
        $('#modal .modal-dialog').removeClass('modal-lg modal-sm modal-dialog-centered')
        $('#modal .modal-dialog').addClass($element.data('size')).addClass($element.data('align'))

        $('#modal .modal-body').html()
        $('body').addClass('modal-loading')
        $('#modal .modal-content').load($element.data('target') + ' #modal-content', function (response, status, xhr) {
            if (status === 'error') {
                let msg = 'Sorry but there was an error: '
                console.log(msg + xhr.status + ' ' + xhr.statusText)
            } else {
                $('#modal').modal()

                $('.textarea-add').on('click', function () {
                    console.log($(this).data('url'), $(this).data('textareaid'))

                    // tinyMCE.getInstanceById($(this).data('textareaid')).setContent($(this).data('url'))

                    $('#modal').modal('hide')
                })
                /* load() */
            }
            $('body').removeClass('modal-loading')
        })
    })
}

load()

/*
// Pour activer les les évenements .trigger-modal sans avoir accés à modal() (tinymce)
$('#modal').on('click', function () {
    load()
})
*/
