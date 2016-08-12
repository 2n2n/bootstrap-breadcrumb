"use strict";
$.extend($.fn, {
    breadcrumb: function (fn, data) {
        var render = function(settings) {
            this.children().remove();
            // create breadcrumb class
            if(!this.hasClass('breadcrumb')) { this.addClass('breadcrumb'); }
            var $container = this;
            $.each(settings.data, function(k, val) {
                var $li = settings.onBeforeInsert(k, val, settings.data);
                $container.append($li);
            });
            
            settings.onAfterInsert.call(this.prop('outerHTML'));

            var $links = this.find('a');
            $links.on('click', function(e) {
                e.preventDefault()
                settings.onLinkClick.call(this, settings.data);
                var position = $(this).data('position');
                settings.data.splice(position);
                render.call($container, settings);
                settings.onAfterRemoveLink.call(this);
            });
        };

        this.settings = {
            data: [],
            onBeforeInsert: function(k, val, data) { // key, obj, settings.data
                var $li = $('<li/>');
                $li.addClass('breadcrumb-item');
                if(k == data.length - 1) {
                    $li.addClass('active'); 
                    return $li.html(val.value); 
                }
                var $a = $('<a/>').html(val.value);
                $a.attr('data-position', k + 1);
                $a.attr('href', '#'+val.id);
                $li.append($a);

                return $li;
            },
            onAfterInsert: function() {},
            onLinkClick: function(data) {},
            onAfterRemoveLink: function() {},
        };      
        
        if(typeof fn === 'object') { $.extend(this.settings, fn); }
        render.call(this, this.settings);
        var context = this;
        var methods = {
            push: function(obj) {
                context.settings.data.push(obj);
                render.call(context, context.settings);
                return methods;
            }
        };
        return methods;

    }
});




