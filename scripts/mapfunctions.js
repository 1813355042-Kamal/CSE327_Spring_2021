
function filterQuery(){
    var minrent=document.getElementById("minrent").value;
    var maxrent=document.getElementById("maxrent").value;
    var minrooms=document.getElementById("minrooms").value;
    var maxrooms=document.getElementById("maxrooms").value;
    var minarea=document.getElementById("minarea").value;
    var maxarea=document.getElementById("maxarea").value;
    if(minrent=="" ) minrent = -1;
    if(maxrent=="" ) maxrent = 10000000;
    if(minrooms=="" ) minrooms = -1;
    if(maxrooms=="" ) maxrooms = 10000000;
    if(minarea=="") minarea= -1;
    if(maxarea=="") maxarea= 10000000;
    minrent= Number(minrent);
    maxrent= Number(maxrent);
    minrooms=Number(minrooms);
    maxrooms=Number(maxrooms);
    minarea=Number(minarea);
    maxarea=Number(maxarea);

    var filterJSON = {
        'type': 'FeatureCollection',
        'features': []
    };
    houseJSON.features.forEach((feat, idx) =>{
        var rent=Number(feat.properties.rent);
        var rooms=Number(feat.properties.bedrooms);
        var area=Number(feat.properties.area);
        if( minrent <=rent && rent <= maxrent && minrooms<= rooms && rooms <= maxrooms && minarea <= area && area <= maxarea ){
            filterJSON.features.push(feat);
        }
    });
    refreshHouseDataSource();
    closeFilterPopup();
}
