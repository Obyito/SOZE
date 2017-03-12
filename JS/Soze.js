



/*--------------*/
/***** Menu *****/
/*--------------*/

$(document).ready(function(){
    $('#button').click(function(){
    $('#menu').css('display','none')
    $('#list').css('display','inline-block')
    })
});
$(document).ready(function(){
    $('#button-close').click(function(){
    $('#menu').css('display','inline-block')
    $('#list').css('display','none')
    })
});


/*-------------------------*/
/***** Background-Move *****/
/*-------------------------*/

$(document).ready(function() {
var movementStrength = 25;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
$("#home").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = width * pageX * -1 - 25;
          var newvalueY = height * pageY * -1 - 50;
          $('#home').css("background-position", newvalueX+"px     "+newvalueY+"px");
});
});

/*-------------*/
/***** Map *****/
/*-------------*/

var vegan = false;
var casher = false;
var hallal = false;
var bio = false;
var paris = {lat: 48.870570, lng: 2.366303};
var map;
var pos;
var infowindow;
var markers = [],
    markers_data;


/*------------------*/
/***** Init-Map *****/
/*------------------*/



function initMap() {
    // activate the map on the div#map and center id by //default on a static lat/lng
    map = new google.maps.Map(document.getElementById('map'), {
        center: paris,
        zoom: 16,
        styles : style,
        scrollwheel: false
    });

    if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                        pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    map.setCenter(pos);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        icon : 'IMG/map_icon/emoji.png',
                    });
                }, function() {

                    console.error('veuillez activez la geolocation');
                });
            } else {
                console.error('votre navigateur ne supporte pas la geolocation');
            }

            infowindow = new google.maps.InfoWindow();
}

//LAUNCH THE SEARCH
var search = function(location, type, keywords) {
    clearMarkers();
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            markers_data = results;
            for(var i=0; i<results.length; i++) {
                console.log(results[i])
                createMarker(results[i]);
            }
        }
    }
    //PREFERENCE MAP
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pos,
        radius: 500,
        types: type,
        keyword: keywords
    }, callback);
}



//CREATE MARKER
function createMarker(place) {
    console.log(place);

    var placeLoc = place.geometry.location;

    var iconType = {};

    //SET ICONS TYPE VEGAN

     if (place.types.indexOf('cafe') != -1 && vegan){
        iconType = "IMG/map_icon/coffe-icon.png";

        } else if (place.types.indexOf('restaurant') != -1 && vegan){
        iconType = "IMG/map_icon/resto-icon-vegan.png";

        } else if (place.types.indexOf('grocery_or_supermarket')!= -1 && vegan){
        iconType = "IMG/map_icon/supermarket-icon-vegan.png";

        } else if (place.types.indexOf('food') != -1 && vegan){
        iconType = "IMG/map_icon/resto-icon-vegan.png";
        }

    //SET ICONS TYPE CASHER

    if (place.types.indexOf('cafe') != -1 && casher){
        iconType = "IMG/map_icon/coffe-icon-casher.png";

        } else if (place.types.indexOf('restaurant') != -1 && casher){
        iconType = "IMG/map_icon/resto-icon-casher.png";

        } else if (place.types.indexOf('grocery_or_supermarket')!= -1 && casher){
        iconType = "IMG/map_icon/supermarket-icon-casher.png";

        } else if (place.types.indexOf('food') != -1 && casher){
        iconType = "IMG/map_icon/resto-icon-casher.png";
        }

    //SET ICONS TYPE HALLAL

    if (place.types.indexOf('cafe') != -1 && hallal){
        iconType = "IMG/map_icon/coffe-icon.png";

        } else if (place.types.indexOf('restaurant') != -1 && hallal){
        iconType = "IMG/map_icon/resto-icon-hallal.png";

        } else if (place.types.indexOf('grocery_or_supermarket')!= -1 && hallal){
        iconType = "IMG/map_icon/supermarket-icon-hallal.png";

        } else if (place.types.indexOf('food') != -1 && hallal){
        iconType = "IMG/map_icon/resto-icon-hallal.png";
        }

    //SET ICONS TYPE BIO

    if (place.types.indexOf('cafe') != -1 && bio){
        iconType = "IMG/map_icon/coffe-icon.png";

        } else if (place.types.indexOf('restaurant') != -1 && bio){
        iconType = "IMG/map_icon/resto-icon-bio.png";

        } else if (place.types.indexOf('grocery_or_supermarket')!= -1 && bio){
        iconType = "IMG/map_icon/supermarket-icon-bio.png";

        } else if (place.types.indexOf('food') != -1 && bio){
        iconType = "IMG/map_icon/resto-icon.png";
        }

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: iconType
        });

        markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(
        '<div id="name">'+
        place.name +
        '</div>'+
        '<br/>' +
        '<div id="adresse">'+
        place.vicinity +
        '</div>'+
        '<br/>');
    infowindow.open(map, marker);
    });

    }

//CLEAR MARKERS WHEN NEW SEARCH
function clearMarkers() {
    for(var i=0; i<markers.length; i++){
        markers[i].setMap(null);

        if(i === markers.length-1)
            markers = [];
    }
}

//CHANGE DIET ON CLICK ('Location',[types], [keywords])
$(document).ready(function(){

        //VEGAN
		$("#vegan_block").click(function(){
            vegan = true;
            casher = false;
            hallal = false;
            bio = false;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['vegan', 'veggie', 'vegetarian', 'vegetal']);
		});

        //CASHER
		$("#casher_block").click(function(){
			vegan = false;
            casher = true;
            hallal = false;
            bio = false;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['casher','cacher']);
		});

        //HALLAL
        $("#hallal_block").click(function(){
			vegan = false;
            casher = false;
            hallal = true;
            bio = false;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['hallal']);
		});

        //BIO
        $("#bio_block").click(function(){
			vegan = false;
            casher = false;
            hallal = false;
            bio =  true;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['bio', 'organic']);
		});
});


// MAP STYLE
var style = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
];
