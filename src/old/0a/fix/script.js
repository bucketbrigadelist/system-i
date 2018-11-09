var ip_url = "http://ipinfo.io";
var owm_url = 'http://api.openweathermap.org/data/2.5/forecast?'
var c_owm_url = 'http://api.openweathermap.org/data/2.5/weather?'
var defplace = "New York, NY"
var lat = 40.7643570;   
var lon = -73.923462;
var OWM_API = '08df7eed7d802cef8f07ac8cade2a64e';
var unit = "metric"
var owm_query = owm_url+"lat="+lat+"&lon="+lon+"&appid="+OWM_API+"&units="+unit;
var c_owm_query = c_owm_url+"lat="+lat+"&lon="+lon+"&appid="+OWM_API+"&units="+unit;
var geocoder;

// DOCUMENT FUNCTION 
$(function(){ 
	// ipinfo.io API
	$.getJSON(ip_url).done(function(ipdata){
    console.log('ipinfo.io 200: SUCCESS');
    var loc = ipdata.loc.split(',');
    var lat = loc[0];
    var lon = loc[1];
    var city = ipdata.city;
	var region = ipdata.region;
	var country = ipdata.country;
	console.log("ipinfo.io gave location: " + lat, lon, city, region, country);
	console.log("Sending location to Weather API...");
	$('#location').html(city +", "+ region);

		// // Current Weather API
		$.getJSON(c_owm_query,function(c_owmdata) {
		console.log("openweather.org today-cast 200: SUCCESS");
		toDay(c_owmdata);
		}).fail(function(response){
			console.log("openweather.org: FAIL");
			alert("Weather data not available. Please try again later or email info@simpleforecast.com if problem persists");
			})	
	
		// // 5 Day Forecast API
		$.getJSON(owm_query,function(i_owmdata) {
		console.log("openweather.org 5-day 200: SUCCESS");
		fiveDay(i_owmdata);
		}).fail(function(response){
			console.log("openweather.org: FAIL");
			alert("Weather data not available. Please try again later or email info@simpleforecast.com if problem persists");
			});

	}).fail(function(response){
  		console.log("No Location from IP: Use search Bar instead. Sending default location");
  		$('#location').html(defplace);
  		lat = 40.7643570;   
		lon = -73.923462;

		// // Current Weather API
		$.getJSON(c_owm_query,function(cd_owmdata) {
		console.log("openweather.org today-cast 200: SUCCESS");
		toDay(cd_owmdata);
		}).fail(function(response){
			console.log("openweather.org: FAIL");
			alert("Weather data not available. Please try again later or email info@simpleforecast.com if problem persists");
			})

		// // 5 Day Forecast API
		var owm_query = owm_url+"lat="+lat+"&lon="+lon+"&appid="+OWM_API+"&units="+unit;
		$.getJSON(owm_query,function(d_owmdata) {
		console.log("openweather.org 5-day 200: SUCCESS");
		fiveDay(d_owmdata);

		}).fail(function(response){
	  		console.log("openweather.org: FAIL");
			alert("Weather data not available. Please try again later or email info@simpleforecast.com if problem persists");
	  		});
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
	 	var loc_state2 = getaddrfieldshort(ui.item.address_components, "administrative_area_level_3");
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
	 	var c_owm_query = c_owm_url+"lat="+lat+"&lon="+lon+"&appid="+OWM_API+"&units="+unit;
	 	console.log(owm_query);

	 	// // Current Weather API
		$.getJSON(c_owm_query,function(gd_owmdata) {
		console.log("openweather.org today-cast 200: SUCCESS");
		toDay(gd_owmdata);
		}).fail(function(response){
			console.log("openweather.org: FAIL");
			alert("Weather data not available. Please try again later or email info@simpleforecast.com if problem persists");
			})

	 	// // 5 Day Forecast API
		$.getJSON(owm_query,function(g_owmdata) {
			console.log("openweather.org 5-day 200: SUCCESS");
			fiveDay(g_owmdata);
		}).fail(function(response){
			console.log("openweather.org: FAIL");
			alert("Weather data not available. Please try again later or email info@simpleforecast.com if problem persists");
			});
	}
	});		
});
// DOCUMENT FUNCTION END


// Gets current data and populates UI
var toDay = function(c_owmdata) {
	var curTemp = c_owmdata.main.temp;
	var main = c_owmdata.weather[0].main;
	var desc = titleCase(c_owmdata.weather[0].description);
	var curUnix = c_owmdata.dt;
	var curIcon = c_owmdata.weather[0].id;
	var curHum = c_owmdata.main.humidity;
	var curWind = Math.round(c_owmdata.wind.speed);
	var curTempInt = Math.floor(curTemp);
	var curFar = curTemp * 1.8 + 32;
	var curFarInt = Math.floor(curFar);
	// Determine day or night style for weather icon.	
	var hourofday = (new Date).getHours();
	var timeofday = "day";
	if (hourofday > 4 && hourofday <= 20) {
			timeofday = "day";
		} else {
			timeofday = "night";
		}
	var curIconSrc = "<i class='weatherIcon wi wi-owm-" + timeofday + "-" + curIcon + "'" + ">" + "</i>";
	$('#nowTemp').html(curFarInt+"<small><sup>&#8457;</sup></small>");
	$('#nowDesc').html(desc);
	$('#nowIcon').html(curIconSrc);
	$('#nowWind').html("Wind Speed: "+ curWind+"mph");
	$('#nowHum').html("Humidity: "+ curHum+"%");
}

// Sorts 5 day forecast and populates UI
var fiveDay = function(owmdata){
var m = 1;	
var n = 1;
var l = 1;
	for (var j=0; j<owmdata.list.length-1; j++) {
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
	var wDate = new Date(unixDays*1000);
	var wHour = wDate.getHours();
	var wDay = wDate.getDate();
	var weekday = days(wDate);
	var dateFix = convertUTCDateToLocalDate(new Date(unixDays*1000));
	dateFix.toLocaleString();
	var fixHour = dateFix.getHours();

	var all = "dateDays:  "+dateDays+"  degCDays: "+degCDays+"  degCMinDays: "+degCMinDays+"  degCMaxDays: "+degCMaxDays+"  windDays: "+windDays+"  descriptionDays: "+descriptionDays+"  iconCodeDays: "+iconCodeDays+"  humdityDays: "+humdityDays+"  degFDays: "+degFDays+"  degCIntDays: "+degCIntDays+"  degFIntDays: "+degFIntDays+"  degCMinIntDays: "+degCMinIntDays+"  egCMaxIntDays: "+degCMaxIntDays +"<br><br><br>";


	var all = unixDays+dateDays
	if (wDay > today) {
		$('#test' + (j)).html(all);
	}


	
	if (wDay > today) {
		/* Populate dayName, dayTemp, dayIcon divs */
		if (fixHour === 13) {
			console.log("dateDays " + dateDays);
			console.log("localtime day " + fixHour +":00");
			var iconSrcDays = "<i class='weatherIcon wi wi-owm-day-"+iconCodeDays+"'"+">"+"</i>";
			
			$('#dayName' + (n)).html(weekday);
			$('#dayTemp' + (n)).html(degFIntDays+"<small><sup>&#8457;</sup></small>");
			$('#dayIcon' + (n)).html(iconSrcDays);
			n = n+1;
		}

		/* Populate nightTemp, nightIcon divs */
		if (fixHour === 22) {
			console.log("localtime night " + fixHour+":00");

			// console.log("night dateDays: " + dateDays);
			var iconSrcDays = "<i class='weatherIcon wi wi-owm-night-"+iconCodeDays+"'"+">"+"</i>";

			$('#nightTemp' + (l)).html(degFIntDays+"<small><sup>&#8457;</sup></small>");
			$('#nightIcon' + (l)).html(iconSrcDays);
			l = l+1;
		}
	}
	}
}


// Capitalise first letter of every word
function titleCase(str) {
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

// Gets day name from date.
function days(dayz){
var d = new Date(dayz);
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayName = weekday[d.getDay()];
return dayName;
}

// Used for determing tomorrow's date for 5 day forecast
var thisDate = new Date(new Date().getTime() + 0 * 60 * 60 * 1000);
var today = thisDate.getDate();
var nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var tomorrow = nextDate.getDate();

// Used to determine localtime from Openweather unixtime and client time 
function convertUTCDateToLocalDate(date) {
var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
var offset = date.getTimezoneOffset() / 60;
var hours = date.getHours();
newDate.setHours(hours - offset);
return newDate;   
}

// Google Place functions for determing long/short name of location  
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

// Page loader and Google Geocoder need to be initialising with <body onload>
function initialize(){
	pageloader = setTimeout(showPage, 1000);
	geocoder = new google.maps.Geocoder();
}	

// Page loader  
function showPage() {
	$('#loader').css("display","none");
	$('#all').css("display","block");
}