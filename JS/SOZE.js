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
        zoom: 13
    });
    infowindow = new google.maps.InfoWindow();
}


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
    
       var iconType = {};
    
    
    
     if (place.types.indexOf('cafe') != -1){
        iconType = "IMG/coffe-icon.png";
         
        } else if (place.types.indexOf('restaurant') != -1){
        iconType = "IMG/resto-icon.png";
        
        } else if (place.types.indexOf('grocery_or_supermarket') != -1){
        iconType = "IMG/supermarket-icon.png";
        
        } else if (place.types.indexOf('food') != -1){
        iconType = "IMG/resto-icon.png";
        }
    
    /*
    
    if (place.types.indexOf('food') != -1)
        iconType['store'] = "images/supermarket-icon.png";
    
    if (place.types.indexOf('food') != -1)
        iconType['establishment'] = "images/supermarket-icon.pngsupermarket-icon.png";
    
    if (place.types.indexOf('food') != -1)
        iconType['point_of_interest'] = "images/supermarket-icon.pngsupermarket-icon.pngsupermarket-icon.png";
    
    if (place.types.indexOf('food') != -1)
        iconType['grocery_or_supermarket'] = "images/supermarket-icon.pngsupermarket-icon.pngsupermarket-icon.pngsupermarket-icon.png";
    */
    
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: iconType
        //[place.types[0]]
        });
    
        markers.push(marker);
        
        google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + '<br/>' + place.vicinity + '<br/>'+ place.types + '">');
        infowindow.open(map, marker);
    });
        //if result type = grocery_or_supermarket {
       // icon : 'images/self.png',
        //title: markers[i][0],
     
        
    

    
 /*   
google.maps.event.addListener(marker, 'click', function() {
        //var index = markers.indexOf(marker),
          //  data = markers_data[index];
          //$('#mapopup').text(data.name);
       
        //infoWindow.setContent(marker.info); 
        infowindow.setContent(place.name + '<br/>' + place.vicinity);
        infowindow.open(map, marker);
       
    });
*/    

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
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['vegan', 'veggie', 'vegetarian', 'vegetal']);
		});
    
        //CASHER
		$("#casher_block").click(function(){
			var  vegan = false;
            var  casher = true;
            var hallal = false;
            var    bio = false;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['casher','cacher']);
		});
    
        //HALLAL
        $("#hallal_block").click(function(){
			var  vegan = false;
            var casher = false;
            var  hallal = true;
            var    bio = false;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['hallal']);
		});
        
        //BIO
        $("#bio_block").click(function(){
			var  vegan = false;
            var casher = false;
            var hallal = false;
            var    bio =  true;
            search(paris, ['restaurant', 'store', 'grocery_or_supermarket', 'food'], ['bio', 'organic']);
		});
});
