import tinymce from 'tinymce'

// A theme is also required
import 'tinymce/themes/silver'

// Any plugins you want to use has to be imported
import 'tinymce/plugins/code'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/image'

require.context(
    'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
    true,
    /.*/
)

tinymce.init({
    selector: '#mytextarea',
    plugins: 'code paste autolink fullscreen link lists media image',
    toolbar: 'bold italic bullist numlist removeformat | formatselect | link image media | code fullscreen',
    menubar: '',
    paste_as_text: true,
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
    fix_list_elements: true
})
