/**
 * phantomjs script for printing presentations to PDF.
 *
 * Example:
 * phantomjs print-pdf.js "http://lab.hakim.se/reveal-js?print-pdf" reveal-demo.pdf
 *
 * By Manuel Bieh (https://github.com/manuelbieh)
 */

// html2pdf.js
const page = new WebPage();
const system = require( 'system' );

page.viewportSize = {
    width: 1024,
    height: 768,
};

page.paperSize = {
    format: 'letter',
    orientation: 'landscape',
    margin: {
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
    },
};

const revealFile = system.args[1] || 'index.html?print-pdf';
let slideFile = system.args[2] || 'slides.pdf';

if ( slideFile.match( /\.pdf$/gi ) === null ) {
    slideFile += '.pdf';
}

console.log( 'Printing PDF...' );

page.open( revealFile, function( status ) {
    console.log( 'Printed succesfully' );
    page.render( slideFile );
    phantom.exit();
} );

