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
    function getevents(latitude, longitude) {
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
                        $(".stationlist").append(
                                $("<li>" + data.fuel_stations[i].station_name + "</li>")
                                );
                    }
                },
                "json");


    }
    var nrelapikey = "5PpIkzUQz0ihMPDb9LcNbRAqxoscqB2qWlXr3eM1";
    $(document).on("click", "#searchbutton", function() {
        getevents(parseFloat($("#latitude").val()), parseFloat($("#longitude").val()));

    });

    $(document).on("click", "#searchnearbutton", function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            getevents(position.coords.latitude, position.coords.longitude);
        });
    });
});
