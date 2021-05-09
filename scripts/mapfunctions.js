
const MAX_INPUT_FIELD_VALUE = 2000000000;

/**
 * This function will filter houses based on the inputs provided by the user in
 * the 'Filter Houses' form, and then update the map accordingly.
 * if invalid inputs are provided, they are set to the default min/max value accordingly.
 */
function filterQuery(){
    var minrent=document.getElementById("minrent").value;
    var maxrent=document.getElementById("maxrent").value;
    var minrooms=document.getElementById("minrooms").value;
    var maxrooms=document.getElementById("maxrooms").value;
    var minarea=document.getElementById("minarea").value;
    var maxarea=document.getElementById("maxarea").value;
    
    minrent= Number(minrent);
    maxrent= Number(maxrent);
    minrooms=Number(minrooms);
    maxrooms=Number(maxrooms);
    minarea=Number(minarea);
    maxarea=Number(maxarea);

    if(maxrent=="" || maxrent == NaN) maxrent = MAX_INPUT_FIELD_VALUE;
    if(minrooms=="" || minrooms== NaN) minrooms = -1;
    if(maxrooms=="" || maxrooms== NaN) maxrooms = MAX_INPUT_FIELD_VALUE;
    if(minarea=="" || minarea== NaN) minarea= -1;
    if(maxarea==""|| maxarea ==NaN) maxarea= MAX_INPUT_FIELD_VALUE;

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