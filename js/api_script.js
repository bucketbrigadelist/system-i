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