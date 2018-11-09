var ip_url = "http://ipinfo.io";
var owm_url = 'http://api.openweathermap.org/data/2.5/forecast?'
var lat = 40.7643570;   
var lon = -73.923462;
var OWM_API = '08df7eed7d802cef8f07ac8cade2a64e';
var unit = "metric"
var owm_query = owm_url+"lat="+lat+"&lon="+lon+"&appid="+OWM_API+"&units="+unit;

var geocoder;
function initialize(){
	geocoder = new google.maps.Geocoder();
}

$(function(){ // DOCUMENT FUNCTION //


						
	// ipinfo.io API
	$.getJSON(ip_url).done(function(ipdata){
    console.log('ipinfo.io 200: SUCCESS');
    d = ipdata;
    loc = d.loc.split(',');
    lat = loc[0];
    lon = loc[1];
    city = d.city;
	region = d.region;
	country = d.country;
	console.log("ipinfo.io gave location: " + lat, lon, city, region, country);
	console.log("Sending location to Weather API...");
	$('#location').html(city + ", " + region);
	// $('#location').append(city);


		// // openweathermap.org API
		$.getJSON(owm_query,function(i_owmdata) {
			// //
			console.log("openweather.org 200: SUCCESS");
			console.log("openweather returned:",i_owmdata.list.length + " forecast items");
			console.log("Populate UI with openweather forecast");
			// var x = ip_owmdata;
			fiveDay(i_owmdata);


			// var $superSimpleTemp = $('.superSimpleTemp');
			// $superSimpleTemp.html("<h5>" + hourofday + "pm"
			// + "<br>" + iconSrcDays 
			// + "<br>" + degCDays + "<sup> C </sup>"
			// );
			



		}).fail(function(response){
			// //
			console.log("openweather.org: FAIL. Please try again later");
		});
	}).fail(function(response){
  	//
  	console.log("Location from IP: FAIL. Attempt Search Bar instead");
  	console.log("Sending default location to Weather API...");
  });


  // Google Places API
	 $("#autocomplete").autocomplete({
	  source:function(request,s_response){
	      geocoder.geocode({'address':request.term},function(results){
	          s_response($.map(results,function(item){
	              return {
	                 label:item.formatted_address,
	                 value:item.formatted_address,
	                 address_components: item.address_components,
	                 latitude:item.geometry.location.lat(),
	                 longitude:item.geometry.location.lng(),
	              }
	          }))
	      })
	 },
	 select:function(event,ui) {
	 	var loc_state1 = getaddrfieldshort(ui.item.address_components, "administrative_area_level_1");
	 	var loc_country = getaddrfieldshort(ui.item.address_components, "country");
	 	var loc_suburb = getaddrfield(ui.item.address_components, "locality");
	 	var setLat = ui.item.latitude;
	 	var setLon = ui.item.longitude;
	 	var placeName = loc_suburb + " " + loc_state1 + ", " + loc_country;
	 	var lat = setLat;
	 	var lon = setLon;
	 	$('#location').html(placeName);
	 	console.log("Google API provided: ", placeName,lat,lon);
	 	console.log("Sending location to Open Weather API...");
	 	var owm_query = owm_url+"lat="+lat+"&lon="+lon+"&appid="+OWM_API+"&units="+unit;
	 	
	 	// // openweathermap.org API
		$.getJSON(owm_query,function(g_owmdata) {
			// //
			console.log("openweather.org 200: SUCCESS");
			console.log("openweather returned:",g_owmdata.list.length + " forecast items");
			console.log("Populate UI with openweather forecast");

			var y = g_owmdata;
			fiveDay(y);

		}).fail(function(response){
			// //
			console.log("openweather.org: FAIL");
		});
	}
	});		


	 		

		 // 	var $hello = $('.hello');
			// $hello.html("<h1>" + iconSrc + "</h1>"
			// + "<h5>" + degCInt + "<sup> C </sup>/ " + degFInt + " <sup> F </sup>"
			// + "<br> Wind: " + wind + " mph"
			// + "<br>" + titleCase(description) + "</h5>"
			// // + "<br> Icon code: " + iconCode
			// // + "<b1> <h1>" + iconSrc + "</h1>"
			// );

}); // END OF DOCUMENT FUNCTION //




	






/* APP FUNCTIONS */

var fiveDay = function(owmdata){
var n = 0;
// console.log(n);
	for (var j=0; j<owmdata.list.length-1; j++) {
		// console.log(j);
			
			var unixDays = owmdata.list[j].dt;
			var dateDays = owmdata.list[j].dt_txt;
			var degCDays = owmdata.list[j].main.temp;
			var degCMinDays = owmdata.list[j].main.temp_min;
			var degCMaxDays = owmdata.list[j].main.temp_max;
			var windDays = Math.round(owmdata.list[j].wind.speed);
			var descriptionDays = owmdata.list[j].weather[0].description; 
			var iconCodeDays = owmdata.list[j].weather[0].id
			var humdityDays = owmdata.list[j].main.humidity;
			var degFDays = degCDays * 1.8 + 32;
			var degCIntDays = Math.floor(degCDays);
			var degFIntDays = Math.floor(degFDays);
			var degCMinIntDays = Math.ceil(degCMinDays);
			var degCMaxIntDays = Math.floor(degCMaxDays);
			var iconSrcDays = "<i class='weatherIcon wi wi-owm-" + timeofday + "-" + iconCodeDays + "'" + ">" + "</i>";

			// UIUpdate;
			// var all = "dateDays:  "+dateDays+"  degCDays: "+degCDays+"  degCMinDays: "+degCMinDays+"  degCMaxDays: "+degCMaxDays+"  windDays: "+windDays+"  descriptionDays: "+descriptionDays+"  iconCodeDays: "+iconCodeDays+"  humdityDays: "+humdityDays+"  degFDays: "+degFDays+"  degCIntDays: "+degCIntDays+"  degFIntDays: "+degFIntDays+"  degCMinIntDays: "+degCMinIntDays+"  egCMaxIntDays: "+degCMaxIntDays+"  iconSrcDays: "+iconSrcDays + "<br><br><br>";
		

			var wDate = new Date(unixDays*1000);
			var wHour = wDate.getHours();

			var wDay = wDate.getDate();
			// console.log("unixDate " + wDate,j);
			// console.log("realDate " + dateDays,j);
			
			

			// Get only weather from tomorrow onwards at 12 midday and 9pm
			if (wDay >= today) {
				console.log(wHour);
				if (wHour == 8 || wHour == 17) {

				// console.log(wDay+ " weather at " + wHour + ":00 " + descriptionDays);
				var iconSrcDays = "<i class='weatherIcon wi wi-owm-" + icontime(wHour) + "-" + iconCodeDays + "'" + ">" + "</i>";
				// console.log(wHour);
				var all = "dateDays:  "+ dateDays+ "  degCDays: "+degCDays+"  degCMinDays: "+degCMinDays+"  degCMaxDays: "+degCMaxDays+"  windDays: "+windDays+"  descriptionDays: "+descriptionDays+"  iconCodeDays: "+iconCodeDays+"  humdityDays: "+humdityDays+"  degFDays: "+degFDays+"  degCIntDays: "+degCIntDays+"  degFIntDays: "+degFIntDays+"  degCMinIntDays: "+degCMinIntDays+"  egCMaxIntDays: "+degCMaxIntDays+"  iconSrcDays: "+iconSrcDays + "<br><br><br>";
				$('#day' + (n)).html(all);
				// console.log(n);
				n = n+1;
				}
			}


			// var all = dateDays+degCDays+degCMinDays+degCMaxDays+windDays+descriptionDays+iconCodeDays+humdityDays+degFDays+degCIntDays+degFIntDays+degCMinIntDays+degCMaxIntDays;
	
			$('#day' + (j)).html(all);	
	}
}

// var t = whatHour(dateDays);

function icontime(hour, light) {
	var light;
	if (hour > 2 && hour < 15) { 
		light = "day";
	} else  {
		light = "night";
	}
	return light;
}


var thisDate = new Date(new Date().getTime() + 0 * 60 * 60 * 1000);
var today = thisDate.getDate();

var nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var tomorrow = nextDate.getDate();
// console.log(today,tomorrow);



/* Google Location Functions */ 
function getaddrfield(addr,type) {
	var ret = "";
	$.each(addr,function(index, c) {
	  if ($.inArray(type,c.types)>=0)
	    ret = c.long_name;
	});
	return(ret);
	}

function getaddrfieldshort(addr,type) {
	var ret = "";
	$.each(addr,function(index, c) {
	  if ($.inArray(type,c.types)>=0)
	    ret = c.short_name;
	});
	return(ret);
	}


/* Time Functions */ 
var timeofday = "day";
var ampm = "am";
var hourofday = (new Date).getHours();
// console.log("Local hour: " + hourofday +":00");
// console.log("Day or Night?: " + timeofday);

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

function whatHour(date){
	var a = new Date(date);
	var hour = a.getHours();
	return hour;
}

function whatDay(day){
	var b = day.getDay();
	var day = b.getDay();
	return day;
}

