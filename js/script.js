console.log("jQuery v"+jQuery.fn.jquery);

// $( "div" ).click(function() {
//   var fontname = $( this ).css( "font-family" );
//   $( "#inforesult" ).html( "That font is " +
//     fontname);
// });

$(document).ready(function() {
    $('#header-i').load('includes/header.html');
    $('#elements').load('includes/elements.html');
    // $('#blocks').load('includes/blocks.html');
    // $('#fonts').load('includes/fonts.html');
    // $('#contentend').load('includes/contentend.html');
    $('#footer-i').load('includes/footer.html');
});