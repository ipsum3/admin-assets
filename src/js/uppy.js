const Uppy = require('@uppy/core')
const XHRUpload = require('@uppy/xhr-upload')
const DragDrop = require('@uppy/drag-drop')
const ProgressBar = require('@uppy/progress-bar')
const French = require('@uppy/locales/lib/fr_FR')

// Function for displaying uploaded files
const onUploadSuccess = (elForUploadedFiles) =>
    (file, response) => {
        const url = response.uploadURL
        const fileName = file.name
        document.querySelector(elForUploadedFiles).innerHTML +=
        `<li><a href="${url}" target="_blank">${fileName}</a></li>`
        uppy.info('Oh my, something good happened!', 'success', 3000)
    }

const uppy = new Uppy({
    debug: false,
    autoProceed: true,
    locale: French,
    restrictions: {
        maxFileSize: null,
        allowedFileTypes: null
    },
    meta: {
        username: 'John'
    }
})
uppy.use(XHRUpload, {
    endpoint: 'https://upload-endpoint.uppy.io/uploads',
    formData: true,
    fieldName: 'files[]'
})
    .use(DragDrop, { target: '.example-one .for-DragDrop', note: 'Images and video only, 2–3 files, up to 1 MB' })
    .use(ProgressBar, { target: '.example-one .for-ProgressBar', hideAfterFinish: false })
    .on('upload-success', onUploadSuccess('.example-one .uploaded-files ol'))
    .on('upload-error', (file, error, response) => {
        console.log('error with file:', file.id)
        console.log('error message:', error)
        console.log('error message:', response)
        document.querySelector('.alerts').innerHTML = `<div class="alert alert-warning">${file.name} : ${error}</div>`
    })
