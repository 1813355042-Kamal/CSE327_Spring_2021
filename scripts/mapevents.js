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
    if(placedmarker){
        //Cursor already placed, remove it:
        cursorCordinates.features=[];
        placedmarker=false;
    }
    else{
        //No cursor placed, place cursor and update global variable.
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
function OnClickListener(coord){
    //Since we're interested in if we click on a house,
    //we'll specify its layers, because the map may have different features on different layers.
    var features = map.queryRenderedFeatures(coord.point, {
        layers: ['house-layer']
    });

    //No house clicked. handle cursor placement.
    if(!features.length){
        OnClickMap(coord);
    }
    //Clicked on House
    else{
        var feature = features[0];
        currentHouse = feature.properties;
        triggerHousePopup(feature.properties);
    }
}

function addCursorSource(){
    //add the Coordinate source for mouse cursor
    map.addSource('cursorCordinates', {
        'type': 'geojson',
        'data': cursorCordinates
    });

    //add the map styling for cursor placement
    map.addLayer({
        id: 'cursor-layer',
        type: 'circle',
        source: 'cursorCordinates',
        paint: {
            'circle-radius': 5,
            'circle-color': '#E00'
        },
        filter: ['in', '$type', 'Point']
    });
}

function addHouseSource(){
    //add the Coordinate source for houses
    map.addSource('houseJSON', {
        'type': 'geojson',
        'data': houseJSON
    });

    //add the map styling for houses
    map.addLayer({
        'id': 'house-layer',
        'type': 'symbol',
        'source': 'houseJSON',
        'layout': {
            'icon-image': 'custom-marker',

            'text-field': ['get', 'title'],
            'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
        }
    });
}

function addStyles(){
    //Download House Marker Icon and Apply on House Source.
    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        refreshHouseDataSource();
    });
}

function refreshHouseDataSource(){
    map.getSource('houseJSON').setData(houseJSON);
}

function clickInterested(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection("Root/Notification/" + currentHouse.owner).add({'msg': user.email + " is interested in your house named " + currentHouse.name});
            closeHousePopup();
        } else {
            window.alert("No user.");
        }
    });
}
function plotOnMap(){
    closePlotPopup();
}
