(function() {
    // Don't emit events from inside of notes windows
    if ( window.location.search.match( /receiver/gi ) ) {
        return;
    }

    const multiplex = Reveal.getConfig().multiplex;

    const socket = io.connect(multiplex.url);

    const notify = function( slideElement, indexh, indexv, origin ) {
        if ( typeof origin === 'undefined' && origin !== 'remote' ) {
            let nextindexh;
            let nextindexv;

            let fragmentindex = Reveal.getIndices().f;
            if (typeof fragmentindex == 'undefined') {
                fragmentindex = 0;
            }

            if (slideElement.nextElementSibling && slideElement.parentNode.nodeName == 'SECTION') {
                nextindexh = indexh;
                nextindexv = indexv + 1;
            } else {
                nextindexh = indexh + 1;
                nextindexv = 0;
            }

            const slideData = {
                indexh: indexh,
                indexv: indexv,
                indexf: fragmentindex,
                nextindexh: nextindexh,
                nextindexv: nextindexv,
                secret: multiplex.secret,
                socketId: multiplex.id,
            };

            socket.emit('slidechanged', slideData);
        }
    };

    Reveal.addEventListener( 'slidechanged', function( event ) {
        notify( event.currentSlide, event.indexh, event.indexv, event.origin );
    } );

    const fragmentNotify = function( event ) {
        notify( Reveal.getCurrentSlide(), Reveal.getIndices().h, Reveal.getIndices().v, event.origin );
    };

    Reveal.addEventListener( 'fragmentshown', fragmentNotify );
    Reveal.addEventListener( 'fragmenthidden', fragmentNotify );
}());
