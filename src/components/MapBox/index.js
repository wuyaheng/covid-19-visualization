import React from "react";
import Map from "./../Map/index";


function MapBox(props) {


        const lat = 30

        const lon = 2

    return (
        <>
            <Map lat={lat} lon={lon} pins={props.results} />
        </>
    )
}

export default MapBox;