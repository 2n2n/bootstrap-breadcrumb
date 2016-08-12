# bootstrap-breadcrumb
This is a plugin for bootstrap's breadcrumb component. [Bootstrap breadcrumb](http://getbootstrap.com/components/#breadcrumbs)

## Example (see index.html):
```javascript
    var counter = 1; 
    var bg = $('.breadcrumb').breadcrumb({ 
        data: [{id: 'default', value: 'Home link'}], // initialize data
        onAfterRemoveLink: function() {
            counter = $(this).data('position'); // the $(this) of onAfterRemoveLink callback is the element you clicked.
            // rape the element as you like >:]
        }
    });
    
    // event listener for the push event.
    $('#push').on('click', function(e) {
        e.preventDefault();
        bg.push({id: 'new-' + counter, value: 'Link ' + counter});
        counter ++;
    });
    
    $('.breadcrumb').breadcrumb({});
```
