import Sortable from 'sortablejs'
import * as $ from 'jquery'

let elements = document.querySelectorAll('.sortable')

elements.forEach(function (element) {
    Sortable.create(element, {
        animation: 150,
        handle: '.sortable-move',
        draggable: '.sortable-item',
        dataIdAttr: 'data-sortable',
        onSort: function () {
            $.ajax({
                method: 'POST',
                url: element.dataset.sortableurl,
                data: {
                    'ids': this.toArray(),
                    '_token': element.dataset.sortablecsrftoken
                },
                headers: { 'X-Requested-With': `XMLHttpRequest` }
            })
        }
    })
})
