function OnMapLoad(){
    addCursorSource();
    addHouseSource();
    addStyles();

    //Add mouseclick event
    map.on('click', function (coord) {
        OnClickListener(coord);
    });

    //Populate houses list
    databaseFetch();
}

function OnClickMap(coord){
    if(placedmarker){ //Cursor already placed, remove it:
        cursorCordinates.features=[];
        placedmarker=false;
    }
    else { //No cursor placed, place cursor and update global variable.
        placedmarker= true;
        var point = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [coord.lngLat.lng, coord.lngLat.lat]
            },
            'properties': {
                'id': 'cursor'
            }
        };
        CursorLat=coord.lngLat.lat;
        CursorLng=coord.lngLat.lng;
        cursorCordinates.features.push(point);
    }
    map.getSource('cursorCordinates').setData(cursorCordinates);
}
/**
* this function will accept details click interested.
*@param{string}
*@returns{layout}
*/
function OnClickListener(coord){
    var features = map.queryRenderedFeatures(coord.point, {
        //Since we're interested in if we click on a house, we'll specify its layers, because the map may have different features on different layers.
        layers: ['house-layer']
    });

    if(!features.length) { //No house clicked. handle cursor placement.
        OnClickMap(coord);
    }
    else{ //Clicked on House
        var feature = features[0];
        currentHouse = feature.properties;
        triggerHousePopup(feature.properties);
    }
}

function OnClickInterested(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection("Root/Notification/" + currentHouse.owner).add({'msg': user.email + " is interested in your house named " + currentHouse.name});
            closeHousePopup();
        } else {
            window.alert("No user.");
        }
    });
}
