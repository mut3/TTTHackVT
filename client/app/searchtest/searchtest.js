'use strict';

angular.module('hackvtApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/searchtest', {
        templateUrl: 'app/searchtest/searchtest.html',
        controller: 'SearchtestCtrl'
      });
  });

jQuery(document).ready(function($) {
    var marker;

    function mapAddPin(name, latitude, longitude) {
        console.log([name,latitude,longitude,map]);
        marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude},
            map: window.map,
            title: name
        });
    }


    function getattractions(latitude, longitude) {
        //TODO: change the hardcoded 1 to a miles value from the ui
        jQuery.get("/api/attractions/near/" + latitude + "/" + longitude + "/1",
                null,
                function(data, textStatus, jqXHR) {
                    console.log("Request returned.");
                    console.log("Attractions:",data);
                    $(".attractionlist").empty();
                    for(var i = 0; i < data.length; i++) {
                        var item = $('<li>' + data[i].name + '</li>');
                        $(".attractionlist").append(item);

                        //Pin dropping function below here
                        mapAddPin(data[i].name, data[i].location[0], data[i].location[1]);
                    }
                },
                "json");
    }
    
    function getfuelstations(latitude, longitude) {
        console.log("fuel stations near",[latitude, longitude]);
        jQuery.get("https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key="
                + nrelapikey
                + "&" + "latitude=" + latitude
                + "&" + "longitude=" + longitude
                + "&" + "fuel_type=ELEC"
                + "&" + "status=E"

                ,
                null,
                function(data, textStatus, jqXHR) {
                    $(".stationlist").empty();
                    console.log("fuel stations:",data);
                    for (var i = 0; i < data['fuel_stations'].length; i++) {
                        var item = $("<li>" + data.fuel_stations[i].station_name + "</li>");
                        item.data("object", data.fuel_stations[i]);
                        item.click(function() {
                            getattractions(data.latitude, data.longitude);
                        });

                        $(".stationlist").append(item);

                        //Pin dropping function below here

                    }
                },
                "json");


    }
    var nrelapikey = "5PpIkzUQz0ihMPDb9LcNbRAqxoscqB2qWlXr3eM1";
    var googleApiKey = "AIzaSyDsZlawn7fzjA64fN6RAiAmUoYhUnEKYA4";
    $(document).on("click", "#nearestButton", function() {
        //getfuelstations(parseFloat($("#latitude").val()), parseFloat($("#longitude").val()));
        jQuery.get("https://maps.googleapis.com/maps/api/geocode/json?key="+googleApiKey+"&address=" + $("#destinationSearch").val(), null,
                function(data, textStatus, jsXHR) {
                    console.log("Address data:",data);
                    if (data.results.length == 0) {
                        alert("No results found!");
                        return;
                    }
                    if (data.results.length != 1) {
                        alert("Too many results found! Narrow your search!");
                        return;
                    }
                    // We found exactly one result
                    getfuelstations(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
                });

    });

    $(document).on("click", "#locationIcon", function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            getfuelstations(position.coords.latitude, position.coords.longitude);
        });
    });

    $(document).on("submit", "#destinationSearchForm", function() {
        $("#nearestButton").click();
    });
});
