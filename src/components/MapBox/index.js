import React from "react";
import Map from "./../Map/index";


function MapBox(props) {

    let lat = props.results.confirmData.reduce((t, r) => t + parseFloat(r.lat), 0) / props.results.confirmData.length;

    let lon = props.results.confirmData.reduce((t, r) => t + parseFloat(r.long), 0) / props.results.confirmData.length;

    if(!lat) {
        lat = 39.74739
    }

    if(!lon) {
        lon = -5
    }

    return (
        <>
            <Map lat={lat} lon={lon} pins={props.results} />
        </>
    )
}

export default MapBox;