(function() {
    // don't emit events from inside the previews themselves
    if ( window.location.search.match( /receiver/gi ) ) {
        return;
    }

    const socket = io.connect(window.location.origin);
    const socketId = Math.random().toString().slice(2);

    console.log('View slide notes at ' + window.location.origin + '/notes/' + socketId);
    window.open(window.location.origin + '/notes/' + socketId, 'notes-' + socketId);

    // Fires when a fragment is shown
    Reveal.addEventListener( 'fragmentshown', function( event ) {
        const fragmentData = {
            fragment: 'next',
            socketId: socketId,
        };
        socket.emit('fragmentchanged', fragmentData);
    } );

    // Fires when a fragment is hidden
    Reveal.addEventListener( 'fragmenthidden', function( event ) {
        const fragmentData = {
            fragment: 'previous',
            socketId: socketId,
        };
        socket.emit('fragmentchanged', fragmentData);
    } );

    // Fires when slide is changed
    Reveal.addEventListener( 'slidechanged', function( event ) {
        let nextindexh;
        let nextindexv;
        const slideElement = event.currentSlide;

        if (slideElement.nextElementSibling && slideElement.parentNode.nodeName == 'SECTION') {
            nextindexh = event.indexh;
            nextindexv = event.indexv + 1;
        } else {
            nextindexh = event.indexh + 1;
            nextindexv = 0;
        }

        const notes = slideElement.querySelector('aside.notes');
        const slideData = {
            notes: notes ? notes.innerHTML : '',
            indexh: event.indexh,
            indexv: event.indexv,
            nextindexh: nextindexh,
            nextindexv: nextindexv,
            socketId: socketId,
            markdown: notes ? typeof notes.getAttribute('data-markdown') === 'string' : false,

        };

        socket.emit('slidechanged', slideData);
    } );
}());
