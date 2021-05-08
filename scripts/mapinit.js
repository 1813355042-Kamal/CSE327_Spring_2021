var placedmarker = false;
var Cursor;
var CursorLat;
var CursorLng;
var currentHouse;
var myMessages = [];
var myListings = [];
var listingDict = {};
var mapPlot = [];
// cursorCordinates object to hold our measurement features
var cursorCordinates = {
    'type': 'FeatureCollection',
    'features': []
};

var houseJSON = {
    'type': 'FeatureCollection',
    'features': []
};

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlc2FsbWFuc2FoZWwiLCJhIjoiY2toNHVqNjd4MGZmcDJ4b3Zzdm02bzJlcyJ9.TqZwgHJ7WGvn876yNRN_4w';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [90.41, 23.78], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD22caki0Faq_SvkK_hEb6Hzbo1xUzARSY",
    authDomain: "cse327-22a1f.firebaseapp.com",
    projectId: "cse327-22a1f",
    storageBucket: "cse327-22a1f.appspot.com",
    messagingSenderId: "655530972906",
    appId: "1:655530972906:web:fe3b9ddfeba0926b14a993",
    measurementId: "G-CFTDRQSXCD"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


map.on('load', function(){
    OnMapLoad();
});
