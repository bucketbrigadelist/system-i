var fiveDay = function(owmdata){
var n = 0;
// console.log(n);
	for (var j=0; j<owmdata.list.length-1; j++) {
		console.log(j);
		var t = whatHour(owmdata.list[j].dt_txt);
		if (t == 15) {
			// 
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
			n = n + 1;
			// console.log(n);
			var all = dateDays+degCDays+degCMinDays+degCMaxDays+windDays+descriptionDays+iconCodeDays+humdityDays+degFDays+degCIntDays+degFIntDays+degCMinIntDays+degCMaxIntDays;
			console.log(n, all);
			// $(".day"+n).append(all)
			$('#day' + (n)).html(all);
			// $(".inner").html( "<div id=day"+ n + "> "+dateDays,degCDays,degCMinDays,degCMaxDays,windDays,descriptionDays,iconCodeDays,humdityDays,degFDays,degCIntDays,degFIntDays,degCMinIntDays,degCMaxIntDays+"</div>");
		} else false;
	}
}


for (var j=0; i<owmdata-1; j++) {
	var t = whatHour(owmdata.list[j].dt_txt);
	if (t === 15) {
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
		n = n + 1;
		$( ".inner" ).append( "<div id=day"+ n + "> "+dateDays,degCDays,degCMinDays,degCMaxDays,windDays,descriptionDays,iconCodeDays,humdityDays,degFDays,degCIntDays,degFIntDays,degCMinIntDays,degCMaxIntDays+"</div>" );
	}
}




for (var j=0; j<owmdata.list.length-1; j++) {
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
		}