export let configTinymce = {
    selector: '.tinymce',
    plugins: 'code paste autolink fullscreen link lists media',
    toolbar: 'bold italic bullist numlist removeformat | formatselect | link medias media | code fullscreen',
    menubar: '',
    paste_as_text: true,
    entity_encoding: 'raw',
    height: 500,
    branding: false,
    target_list: false,
    image_class_list: [
        { title: 'None', value: '' },
        { title: 'Left', value: 'text-left' },
        { title: 'Center', value: 'text-center' }
    ],
    image_dimensions: false,
    object_resizing: false,
    block_formats: 'Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4; Preformatted=pre',
    fix_list_elements: true,
    relative_urls: false,
    document_base_url: document.location.origin,
    remove_script_host: true,
    // convert_urls: true,
    draggable_modal: true,
    // content_css: 'http://www.ipsum.test/ipsum/admin/dist/main.css',
    setup: function (editor) {
        let id = this.id
        editor.ui.registry.addButton('medias', {
            // text: 'Médias',
            tooltip: 'Médias',
            icon: 'image',
            onAction: function () {
                editor.windowManager.openUrl({
                    title: 'Médias',
                    url: document.getElementById(id).dataset.medias
                })
            }
        })
    }
}

export let configTinymceSimple = {
    selector: '.tinymce-simple',
    plugins: 'code paste autolink link',
    toolbar: 'bold italic removeformat | link | code',
    menubar: '',
    paste_as_text: true,
    branding: false,
    forced_root_block: '',
    statusbar: false,
    entity_encoding: 'raw'
}
