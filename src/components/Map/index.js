import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);


      let confirmMap = L.map("mapid").setView([props.lat, props.lon], 2)
      
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(confirmMap);


        var fixUndefined = (item) => (typeof (item) !== 'undefined' ? item : 'Unknown'); 

      props.pins.forEach((pin) =>
      (pin?.properties?.covid?.lat && pin?.properties?.covid?.long) ? 
      L.marker([pin.properties.covid.lat, pin.properties.covid.long]).addTo(confirmMap).bindTooltip('<p><b>' + pin.properties.ADMIN + 
      '</b></p><p><b>Recovered: </b>' + pin.properties.covid.recovered + '</p><p><b>Confirmed:</b> ' + pin.properties.covid.confirmed + '</p>') 
   : null );

                var geoJson = L.geoJson(props.pins, {
                style: function(feature) {
                    return {
                    color: "white",
                    fillColor: "lightblue",
                    fillOpacity: 0.7,
                    weight: 1.5
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                        fillOpacity: 1
                        });
                    },
                    mouseout: function(event) {
                        geoJson.resetStyle(event.target);
                    },
                    click: function(event) {
                      confirmMap.fitBounds(event.target.getBounds()); 
                    }
                    });
                    layer.bindTooltip("<p><b>" + feature.properties.ADMIN + "</b></p>");
                }
                }).addTo(confirmMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};

