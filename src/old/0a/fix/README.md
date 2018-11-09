A simple five-day weather forecast AJAX application created utilising the Openweathermap, Ipinfo and Google Places APIs.

In a nutshell. Simpleforecast makes a call to ipinfo.io in an attempt to get a user's location from their IP address. If successful, it then passes their longitude/latitude coordinates to the openweathermap API and upon success provides a 5 day weather forecast for that location and populates the UI with that data. If the call to ipinfo fails (which it might for a number of reasons - firewalls, adblockers, weird API key names, too many requests to the server, etc), a default location is sent to openweathermap and the UI is populated with that.

Additionally the Google Places API provides an autocomplete bar which enables use the user to search a location which pass coordinates to the openweathermap API.


http://inclusivetech.co.uk/simpleforecast/