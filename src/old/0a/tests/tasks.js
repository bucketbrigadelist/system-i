console.log("Check TASKS");

// TASKS //

// Update the DOM
// Create UI
// Style UI - Sass / Bootstrap  
// Access Location API 


// DONE :-) //

// Access Weather API 	:-)
// Basic Error Handler 	:-)
// Add search area for location :-)



//

var timeofday = "day";
var ampm = "am";
var hourofday = (new Date).getHours();
console.log("Local hour: " + hourofday +":00");
console.log("Day or Night?: " + timeofday);

if (hourofday >= 6 && hourofday <= 18) {
	timeofday = "day";
} else {
	timeofday = "night";
}
if (hourofday >= 0 && hourofday <= 12) {
	ampm = "am";
} else {
	ampm = "pm";
}

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}
