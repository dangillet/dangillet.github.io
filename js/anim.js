
(function ($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

    // Small optimization: let's cache those items
    const win = $(window);
    const allLis = $("ul.aerial li");

    {
        // Scope this in order not to leak `i`
        let i = 0;
        allLis.each(function (n, el) {
            let $el = $(el);
            if ($el.visible(true)) {
                $el.css({
                    'animation-delay': 0.1 * i + 's'
                });
                i++;
                $el.addClass("come-in");
            }
        });
    }

    win.scroll(function (event) {
        allLis.each(function (i, el) {
            let $el = $(el);
            if ($el.visible(true)) {
                $el.addClass("come-in");
            }
        });
    });

})(jQuery);