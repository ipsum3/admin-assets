import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import DragDrop from '@uppy/drag-drop'
import ProgressBar from '@uppy/progress-bar'
import French from '@uppy/locales/lib/fr_FR'

window.uppyInit = function (upload) {
    function renderMedia () {
        let xhr = new window.XMLHttpRequest()

        xhr.open('GET', upload.dataset.uploadmedias)
        xhr.onload = function () {
            if (xhr.status === 200) {
                upload.querySelector('.upload-files').innerHTML = xhr.responseText
            }
        }
        xhr.send()
    }

    renderMedia()

    const uppy = new Uppy({
        debug: false,
        autoProceed: true,
        locale: French,
        restrictions: {
            maxFileSize: parseInt(upload.dataset.uploadmaxfilesize) * 1000,
            maxNumberOfFiles: upload.dataset.uploadmmaxnumberoffiles !== '' ? parseInt(upload.dataset.uploadmmaxnumberoffiles) : null,
            minNumberOfFiles: upload.dataset.uploadminnumberoffiles !== '' ? parseInt(upload.dataset.uploadminnumberoffiles) : null,
            allowedFileTypes: upload.dataset.uploadallowedfiletypes !== '' ? upload.dataset.uploadallowedfiletypes.split(',') : null
        },
        meta: {
            publication_id: upload.dataset.uploadpublicationid,
            publication_type: upload.dataset.uploadpublicationtype,
            repertoire: upload.dataset.uploadrepertoire,
            path: upload.dataset.uploadpath === undefined ? '' : upload.dataset.uploadpath,
            groupe: upload.dataset.uploadgroupe,
            _token: upload.dataset.uploadcsrftoken
        }
    })

    uppy.use(XHRUpload, {
        endpoint: upload.dataset.uploadendpoint,
        formData: true,
        fieldName: 'media',
        headers: {
            'X-Requested-With': `XMLHttpRequest`
        }
    })

    uppy.use(DragDrop, {
        target: upload.querySelector('.upload-DragDrop'),
        note: upload.dataset.uploadnote
    })

    uppy.use(ProgressBar, {
        target: upload.querySelector('.upload-ProgressBar'),
        hideAfterFinish: false
    })
    uppy.on('upload-success', (file, response) => {
        upload.querySelector('.upload-alerts').insertAdjacentHTML('beforeend', `<div class="alert alert-success">${response.body.message}</div>`)
        renderMedia()
    })
    uppy.on('upload-error', (file, error, response) => {
        console.log('error with file:', file.id)
        console.log('error message:', error)
        console.log('error message:', response)

        if (response.body.errors !== undefined && Array.isArray(response.body.errors.media)) {
            response.body.errors.media.forEach(function (error) {
                upload.querySelector('.upload-alerts').insertAdjacentHTML('beforeend', `<div class="alert alert-warning">${file.name} : ${error}</div>`)
            })
        } else if (response.body.message !== undefined && response.body.message !== '') {
            upload.querySelector('.upload-alerts').insertAdjacentHTML('beforeend', `<div class="alert alert-warning">${file.name} : ${response.body.message}</div>`)
        } else {
            upload.querySelector('.upload-alerts').insertAdjacentHTML('beforeend', `<div class="alert alert-warning">${file.name} : ${error}</div>`)
        }
    })
    uppy.on('restriction-failed', (file, error) => {
        upload.querySelector('.upload-alerts').insertAdjacentHTML('beforeend', `<div class="alert alert-warning">${file.name} : ${error}</div>`)
    })
}

document.querySelectorAll('.upload').forEach(function (upload) {
    window.uppyInit(upload)
})
