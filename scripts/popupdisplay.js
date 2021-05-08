function triggerRegisterNewHousePopup(){
    if(!placedmarker) {
        triggerListingPopup();
    }
    else{
        document.getElementById("registerhousepopup").style.display = "flex";
    }
}
function triggerListingPopup(){
    getListingFromDatabase();
    document.getElementById("listingpopup").style.display = "flex";
}
function closeListingPopup(){
    document.getElementById("listingpopup").style.display = "none";
}
function closeRegisterNewHousePopup(){
    document.getElementById("registerhousepopup").style.display = "none";
}
function triggerFilterPopup(){
    document.getElementById("filterpopup").style.display = "flex";
}
function closeFilterPopup(){
    document.getElementById("filterpopup").style.display = "none";
}
function triggerPlotPopup(){
    document.getElementById("plotpopup").style.display = "flex";
}
function closePlotPopup(){
    document.getElementById("plotpopup").style.display = "none";
}
async function triggerNotificationsPopup(){
    await getNotificationsFromDatabase();
}
function closeNotifications(){
    document.getElementById("notif").style.display = "none";
}
function triggerHousePopup(house){
    document.getElementById("housepopup_name").innerHTML = "House Name: "+ house.name;
    document.getElementById("housepopup_rent").innerHTML = "Rent: "+house.rent;
    document.getElementById("housepopup_area").innerHTML = "Area: "+ house.area;
    document.getElementById("housepopup_bedrooms").innerHTML = "Bedrooms: "+house.bedrooms;
    document.getElementById("housepopup_bathrooms").innerHTML = "Bathrooms: "+house.bathrooms;
    document.getElementById("disphouseid").style.height = "350px";

    var imglink = house.imglink;
    if (imglink!=null && imglink != "undefined" && imglink != ""){
        document.getElementById("disphouseid").style.width = "800px";
        document.getElementById("housepopup_image").innerHTML="";
        document.getElementById("housepopup_image").innerHTML="<img src=\""+imglink+"\" class=\"housepopup_image_id\"></img>";
        document.getElementById("disphouseid").style.height = "800px";
        document.getElementById("housepopup_image").style.display="flex";
    }
    else{
        document.getElementById("disphouseid").style.width = "500px";
        document.getElementById("housepopup_image").innerHTML="";
        document.getElementById("housepopup_image").style.display="none";
    }
    document.getElementById("displayhouseinfopopup").style.display = "flex";
}
function closeHousePopup(){
    document.getElementById("displayhouseinfopopup").style.display = "none";
}
