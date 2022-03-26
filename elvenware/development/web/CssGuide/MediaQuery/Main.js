/**
 * @author Charlie
 */

// const sampleHelpers = 
new SampleHelpers();

// $('document').ready(function() {
var callback = function () {
    $('header').html('<h1>Charlie\'s Example Site</h1>');
    $('nav').html('<p class="menu_class">Toggle Menu</p>' +
        '<ul class="theMenu">' +
        '<li><a href="Page01.html">Page01</a></li>' +
        '<li><a href="Page02.html">Page02</a></li>' +
        '<li><a href="Page03.html">Page03</a></li>');
    $('footer').html('<p>&copy; Copyright 2011 by Charlie Calvert</p>');

    $('p.menu_class').click(function () {
        $('nav ul.theMenu').slideToggle('medium');
    });
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}


function SampleHelpers() {
    this.addNumbers = function () {
        const operanda = $('#operanda').val();
        const operandb = $('#operandb').val();
        const sum = parseInt(operanda) + parseInt(operandb);
        $('#result').html(sum);
        $('#answer').val(sum);
    };

    this.clean = function (url) {
        location.href = url;
    };

    this.setStyleSheet = function (title) {
        let i; let sheet; // let main;
        if (title) {
            for (i = 0; (sheet = document.getElementsByTagName('link')[i]); i++) {
                if (sheet.getAttribute('rel').indexOf('style') != -1 && sheet.getAttribute('title')) {
                    sheet.disabled = true;
                    if (sheet.getAttribute('title') == title) {
                        sheet.disabled = false;
                        $('#debug').html('You chose: ' + sheet.title);
                    }
                }
            }
        }
    };
}
