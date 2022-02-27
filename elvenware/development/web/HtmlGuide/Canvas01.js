let context;
let context02;
let image;

$('document').ready(function() {
    'use strict';
    console.log('Document Ready called');
    const canvas01 = $('#canvas01');
    context = canvas01.get(0).getContext('2d');
    const canvas02 = $('#canvas02');
    context02 = canvas02.get(0).getContext('2d');
});

function loadImage(callback) {
    'use strict';
    console.log('loadImage called');
    const image = new Image();
    image.onload = function() {
        callback(image);
    };
    image.src = 'images/cscGarden.png';
}

function doLoad() {
    'use strict';
    conole.log('doLoad called');
    const canvas01 = document.getElementById('canvas01');
    const context = canvas01.getContext('2d');
    loadImage(function(image) {
	  context.drawImage(image, 0, 0);
    });
}

function doLoader() {
    'use strict';
    console.log('doLoader called');
    image = new Image();
    image.src = 'images/cscGarden.png';
    $(image).load(function() {
	  context.drawImage(image, 0, 0);
	  context.clearRect(0, 0, 75, 75);
    });
}

function blitTest() {
    'use strict';
    console.log('blitTest called');
    // var imageData = context.getImageData(0, 0, 25, 25);
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 12; i++) {
            context.drawImage(image, 0, 25, 25, 25, i * 25, j * 25, 25, 25);
        }
    }
}
