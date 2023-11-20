import tinymce from 'tinymce'
import { configTinymceSimple, configTinymce } from './tinymce_config'

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
// import 'tinymce/plugins/image'

require.context(
    'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
    true,
    /.*/
)

tinymce.init(configTinymce)
tinymce.init(configTinymceSimple)
