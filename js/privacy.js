
$(function () {
    $.ajax({
        url: "privacy.html",
    })
    .done(function( html ) {
        $( "#Privacy" ).append( html );
    });
});