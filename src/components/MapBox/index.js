import React from "react";
import Map from "./../Map/index";


function MapBox(props) {

    var lat, lon;

    if (props.results.length > 20) {
        lat = 30
        lon = 2
    } else {
        lat = props.results[0]?.properties?.covid?.lat

        lon = props.results[0]?.properties?.covid?.long
    }


    return (
        <>
            <Map lat={lat} lon={lon} pins={props.results} />
        </>
    )
}

export default MapBox;