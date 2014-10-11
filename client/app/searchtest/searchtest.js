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
    var markers = [];
    var fuelPinImage = '/app/assets/images/yellowPin.png';
    var personPinImage = '/app/assets/images/starPin.png';
    var nrelapikey = "5PpIkzUQz0ihMPDb9LcNbRAqxoscqB2qWlXr3eM1";
    var googleApiKey = "AIzaSyDsZlawn7fzjA64fN6RAiAmUoYhUnEKYA4";


    function mapAddPin(name, latitude, longitude) {
        //console.log([name,latitude,longitude,map]);
        var mark = new google.maps.Marker({
            position: { lat: latitude, lng: longitude},
            map: window.map,
            title: name
        });
        google.maps.event.addListener(mark, "click", function() {
            //console.log(mark.getPosition().lat(), mark.getPosition().lng());
            getattractions(mark.getPosition().lat(), mark.getPosition().lng());
        });
        markers.push(mark);
    }

    function mapClear(map) {
        for (var n = 0; n < markers.length; n++) {
            markers[n].setMap(map);
        }
        markers=[];
    }

    function mapCenterOn(latitude, longitude) {
        window.map.setCenter(new google.maps.LatLng(latitude, longitude));
        window.map.setZoom(13);
    }


    function getattractions(latitude, longitude, only) {
        //TODO: change the hardcoded 1 to a miles value from the ui
        jQuery.get("/api/attractions/near/" + latitude + "/" + longitude + "/1",
                null,
                function(data, textStatus, jqXHR) {
                    mapClear(null);
                    if (only == undefined) {
                        mapCenterOn(latitude,longitude);
                        $(".attractionlist").empty();
                    }
                    console.log("Request returned.");
                    console.log("Attractions:",data);
                    navigator.geolocation.getCurrentPosition(function(position) {
                            var userLatitude = position.coords.latitude;
                            var userLongitude = position.coords.longitude;
                            mapAddPin('You are here', userLatitude, userLongitude);
                        });
                    for(var i = 0; i < data.length; i++) {
                        if (only == undefined) {
                            var item = $('<li>' + data[i].name + '</li>');
                            console.log(data[i]);
                            item.data("object", data[i]);
                            item.click(function() {
                                var object = $(this).data("object");
                                getattractions(object.location[0], object.location[1], object.name);
                            });
                            $(".attractionlist").append(item);
                        }

                        //Pin dropping function below here
                        if (only != undefined) {
                           if (data[i].name == only) {
                            mapAddPin(data[i].name, data[i].location[0], data[i].location[1]);
                           }
                        }
                        else {
                            mapAddPin(data[i].name, data[i].location[0], data[i].location[1]);
                        }
                    }
                },
                "json");
    }
    function populateFuelStations(stations) {
        $(".stationlist").empty();
        console.log("fuel stations:",stations);
        var namesIncluded = [];
        for (var i = 0; i < stations.length; i++) {
            if (namesIncluded.indexOf(stations[i].station_name) != -1) {
                continue; // Skip it if we already listed an item with this name
            }
            namesIncluded.push(stations[i].station_name);
            console.log(namesIncluded);
            var item = $("<li>" + stations[i].station_name + "</li>");
            item.data("object", stations[i]);
            item.click(function() {
                var object = $(this).data("object");
                getattractions(object.latitude, object.longitude);
            });

            $(".stationlist").append(item);

            //Pin dropping function below here
            mapAddPin(stations[i].station_name, stations[i].latitude, stations[i].longitude);
        }
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
                    mapClear(null);
                    mapAddPin('You are here.', latitude, longitude);
                    mapCenterOn(latitude,longitude);
                    populateFuelStations(data.fuel_stations);
                    },
                "json");


    }
    
    $(document).on("click", "#nearestButton", function() {
        //getfuelstations(parseFloat($("#latitude").val()), parseFloat($("#longitude").val()));
        jQuery.get("https://maps.googleapis.com/maps/api/geocode/json?sensor=true&key="+googleApiKey+"&address=" + $("#destinationSearch").val(), null,
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
    $(document).on("click", "#routeButton", function() {
        console.log("Searching for your position.");
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Found position");
            var directionsService = new google.maps.DirectionsService();

            var directionsRequest = {
                origin: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                destination: $("#destinationSearch").val(),
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL
            };
            console.log(directionsRequest);
            console.log("Searching for a route.");
            directionsService.route(directionsRequest, function(result, status) {
                var overview_path = result.routes[0].overview_path;
                var linestring = "LINESTRING(";
                for(var i = 0; i < overview_path.length; i++) {
                    if (i == overview_path.length - 1 || i % 2 == 0) {
                        linestring += overview_path[i].lng() + " " + overview_path[i].lat();
                        if (i != overview_path.length - 1) {
                            linestring += ", ";
                        }
                    }

                    //console.log(i);
                }
                linestring += ")";

                var url = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearby-route.json?api_key=" + nrelapikey
                        +"&route=" + linestring
                        + "&" + "fuel_type=ELEC"
                        + "&" + "status=E";
                console.log(url);
                jQuery.get(url,
                        null,
                        function(data, textStatus, jqXHR) {
                            mapClear(null);
                            //mapCenterOn(latitude,longitude);
                            populateFuelStations(data.fuel_stations);
                        },
                        "json"
                        );

                console.log(linestring);
            });

        });
    });

    $(document).on("click", "#allIcon", function() {
        jQuery.get("https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key="
                + nrelapikey
                + "&" + "state=VT"
                + "&" + "fuel_type=ELEC"
                + "&" + "status=E"
                ,
                null,
                function(data, textStatus, jqXHR) {
                    mapClear(null);
                    //mapAddPin('You are here.', latitude, longitude);
                    //mapCenterOn(latitude,longitude);
                    populateFuelStations(data.fuel_stations);
                    },
                "json");
    });
});
