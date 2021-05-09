//Fetch House data from database.
function databaseFetch(){
    houseJSON.features=[];
    db.collection("Root/HouseList/houses")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var house = doc.data();
            var point = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [house["Lng"], house["Lat"]]
                },
                'properties': {
                    'id': 'house',
                    'name': house["name"],
                    'rent': house["rent"],
                    'area': house["area"],
                    'bedrooms': house["bedrooms"],
                    'bathrooms': house["bathrooms"],
                    'owner': house["owner"],
                    'imglink' : house["imglink"]
                }
            };
            houseJSON.features.push(point);
    });
    refreshHouseDataSource();
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

//This adds the newly registered house to the database.
function addHouseinDB(){
    databaseFetch();
    var _housename = document.getElementById("housename").value;
    var _rent = document.getElementById("rent").value;
    var _bedrooms = document.getElementById("bedrooms").value;
    var _bathrooms = document.getElementById("bathrooms").value;
    var _imagelink = document.getElementById("imglink").value;
    var _area = document.getElementById("area").value;

    if(_housename == "" || rent=="" || bedrooms == "" || bathrooms == "") return;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection("Root").doc("HouseList").collection("houses").add({
                name: _housename,
                rent: _rent,
                bedrooms: Number(_bedrooms),
                bathrooms: Number(_bathrooms),
                area: Number(_area),
                Lat: CursorLat,
                Lng: CursorLng,
                owner: user.email,
                imglink: _imagelink
            })
            .then((doc) => {
                //For notifications, access "Root/notifs/user.email"
                //insert _housename and house doc.id.
                //to delete notification (and listing), search through Root/HouseList/houses for "doc.id" named listing.
                db.collection("Root").doc("Users").collection(user.email).add({
                    id:doc.id,
                    name: _housename
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            closeRegisterNewHousePopup();

        } else {
            window.alert("No user.");
        }
    });
}

//Retrieve my Listings from the database
async function getListingFromDatabase(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            myListings = [];
            listingDict= {};
            document.getElementById("listingpopup_listings").innerHTML="";
            db.collection("Root/Users/"+user.email)
            .get()
            .then((querySnapshot) => {
                var cntr=0;
                querySnapshot.forEach((doc, idx) => {
                    var p1=doc.data()["id"];
                    var p2=doc.data()["name"];
                    myListings.push({"id":p1,
                                     "name":p2,
                                     "index":cntr});
                    cntr++;
                });
                myListings.forEach((listing) => {
                    var cur_id="listing_index" + listing.index;
                    document.getElementById("listingpopup_listings").innerHTML+= "<li class=\"msgItem listing-item\" id=\"" + cur_id+"\">"+listing.name+"</li>";
                });
            })
            .catch((error) => {
                console.error("Error in reading" + error);
            });
        } else {
            window.alert("No user.");
        }
    });
}

//Retrieve notifications from database
async function getNotificationsFromDatabase(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            myMessages=[];
            document.getElementById("notificationmessages").innerHTML="";
            db.collection("Root/Notification/"+user.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc, idx) => {
                    myMessages.push(doc.data()["msg"]);
                });
                myMessages.forEach((msg) => {
                    document.getElementById("notificationmessages").innerHTML+= "<li class=\"msgItem\">"+msg+"</li>";
                });
                document.getElementById("notif").style.display = "flex";
            })
            .catch((error) => {
                console.error("Error in reading" + error);
            });
        } else {
            window.alert("No user.");
        }
    });
}
