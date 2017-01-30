
// tout foutre dans la même fonction plus tard.
//reseau sociaux  hover.

//SOCIAL MEDIA HOVER
$(document).ready(function(){
    $('#instagram').hover(function(){ 
        $('#instagram').attr('src','Images/Icones/Instagram.png');
    },
    function(){ $('#instagram').attr('src','Images/Icones/Instagram42.png')
    });
});

$(document).ready(function(){
    $('#twitter').hover(function(){                       $('#twitter').attr('src','Images/Icones/Twitter.png');
    },
    function(){
    $('#twitter').attr('src','Images/Icones/twitter42.png')
    });
});

$(document).ready(function(){
    $('#facebook').hover(function(){                       $('#facebook').attr('src','Images/Icones/Facebook.png');
    },
    function(){
    $('#facebook').attr('src','Images/Icones/facebook42.png')
    });
});

$(document).ready(function(){
    $('#google_plus').hover(function(){                     $('#google_plus').attr('src','Images/Icones/Google+.png');
    },
    function(){
    $('#google_plus').attr('src','Images/Icones/google-plus42.png')
    });
});


//GOOGLE MAP API SYSTEM//
    
var vegan = false;
var casher = false;
var hallal = false;
var bio = false;
var paris = {lat: 48.870570, lng: 2.366303};
var map;
var infowindow;
var markers = [],
    markers_data;


//INIT MAP
function initMap() {
    // activate the map on the div#map and center id by //default on a static lat/lng
    map = new google.maps.Map(document.getElementById('map'), {
        center: paris,
        zoom: 13
    });
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
        location: location,
        radius: 3000,
        types: type,
        keyword: keywords
        
    }, callback);
}


    
//CREATE MARKER 
function createMarker(place) {  
    console.log(place);
    
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
         position: place.geometry.location,
        icon : 'images/self.png',
        //title: markers[i][0],
        
    });

    markers.push(marker);
    
    google.maps.event.addListener(marker, 'click', function() {
        //var index = markers.indexOf(marker),
          //  data = markers_data[index];
          //$('#mapopup').text(data.name);
       
        //infoWindow.setContent(marker.info);    
       
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
			var   vegan = true;
            var casher = false;
            var hallal = false;
            var    bio = false;
            $("#vegan_block").css("background-color", "green");
            $("#casher_block").css("background-color", "red");
            $("#hallal_block").css("background-color", "red");
            $("#bio_block").css("background-color", "red");
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['vegan', 'veggie', 'vegetarian', 'vegetal']);
		});
    
        //CASHER
		$("#casher_block").click(function(){
			var  vegan = false;
            var  casher = true;
            var hallal = false;
            var    bio = false;
            $("#casher_block").css("background-color", "green");
            $("#vegan_block").css("background-color", "red");
            $("#hallal_block").css("background-color", "red");
            $("#bio_block").css("background-color", "red");
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['casher','cacher']);
		});
    
        //HALLAL
        $("#hallal_block").click(function(){
			var  vegan = false;
            var casher = false;
            var  hallal = true;
            var    bio = false;
            $("#casher_block").css("background-color", "red");
            $("#vegan_block").css("background-color", "red");
            $("#hallal_block").css("background-color", "green");
            $("#bio_block").css("background-color", "red");
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['hallal']);
		});
        
        //BIO
        $("#bio_block").click(function(){
			var  vegan = false;
            var casher = false;
            var hallal = false;
            var    bio =  true;
            $("#casher_block").css("background-color", "red");
            $("#vegan_block").css("background-color", "red");
            $("#hallal_block").css("background-color", "red");
            $("#bio_block").css("background-color", "green");
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['bio', 'organic']);
		});
});


/*jQuery(function($) {
    function fixDiv() {
        var $cache = $('#button-list');
            if ($(window).scrollTop() < 720){
                $cache.fadeOut().css({
                'position': 'absolute',    
                });

            }
    
            else if ($(window).scrollTop() > 720 && $(window).scrollTop() < 1000){
                $cache.fadeIn().css({
                'position': 'fixed',
                'right': '30px', 
                });

            }
            else{
                $cache.css({
                'position': 'absolute',
                'right': '30px',
                });
            }         
    }
    
    $(window).scroll(fixDiv);
    fixDiv();
});*/
