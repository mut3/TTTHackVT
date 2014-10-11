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
    function getattractions(latitude, longitude) {
        jQuery.get("/api/attractions/near/" + latitude + "/" + longitude,
                null,
                function(data, textStatus, jqXHR) {
                    console.log("Request returned.");
                    console.log(data);
                    $(".attractionlist").empty();
                    for(var i = 0; i < data.length; i++) {
                        console.log("Looping.");
                        var item = $('<li>' + data[i].name + '</li>');
                        $(".attractionlist").append(item);
                    }
                },
                "json");
    }
    function getfuelstations(latitude, longitude) {
        console.log([latitude, longitude]);
        jQuery.get("https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key="
                + nrelapikey
                + "&" + "latitude=" + latitude
                + "&" + "longitude=" + longitude

                ,
                null,
                function(data, textStatus, jqXHR) {
                    $(".stationlist").empty();
                    for (var i = 0; i < data['fuel_stations'].length; i++) {
                        var item = $("<li>" + data.fuel_stations[i].station_name + "</li>");
                        item.data("object", data);
                        item.click(function() {
                            getattractions(data.latitude, data.longitude);
                        });
                        $(".stationlist").append(item);
                    }
                },
                "json");


    }
    var nrelapikey = "5PpIkzUQz0ihMPDb9LcNbRAqxoscqB2qWlXr3eM1";
    $(document).on("click", "#nearestButton", function() {
        //getfuelstations(parseFloat($("#latitude").val()), parseFloat($("#longitude").val()));
        jQuery.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + $("#destinationSearch").val(), null,
                function(data, textStatus, jsXHR) {
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
                    //console.log(data);
                });

    });

    $(document).on("click", "#locationIcon", function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            getfuelstations(position.coords.latitude, position.coords.longitude);
        });
    });

    $(document).on("submit", "#destinationSearchForm", function() {
        $("#locationIcon").click();
    });
});
