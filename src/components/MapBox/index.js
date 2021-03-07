import React from "react";
import Map from "./../Map/index";


function MapBox(props) {


        const lat = 39.74739

        const lon = -5

    return (
        <>
            <Map lat={lat} lon={lon} pins={props.results} />
        </>
    )
}

export default MapBox;