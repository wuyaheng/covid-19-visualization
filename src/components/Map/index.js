import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';
import moment from 'moment'


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
      '</b></p><p><b>Confirmed:</b> ' + pin.properties.covid.confirmed + '</p><p><b>Death: </b>' + pin.properties.covid.deaths + '</p><p><b>Last Update: </b>' + moment(pin.properties.covid.lastUpdate).format('L') + '</p>') 
   : null );


      function chooseColor(x) {
        if (x >= 900000) {
          return "#641220"
        } else if (x >= 50000) {
          return "#6e1423";
        } else if (x >= 1000) {
          return "#85182a";
        } else if (x >= 100) {
          return "#a11d33";
        } else if (x >= 10) {
          return "#a71e34";
        } else {
          return "black";
        }
    }


                var geoJson = L.geoJson(props.pins, {
                style: function(feature) {
                  console.log(feature.properties.covid?.confirmed)
                    return {
                    color: "white",
                    fillColor: chooseColor(feature?.properties?.covid?.confirmed),
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
                    layer.bindTooltip("<p><b>" + feature.properties.ADMIN + "</b></p><p><b>Confirmed:</b> " + feature?.properties?.covid?.confirmed + "</p><p><b>Deaths: </b>" + feature?.properties?.covid?.deaths + "</p><p><b>Last Update: </b>" + moment(feature?.properties?.covid?.lastUpdate).format('L') + "</p>");
                }
                }).addTo(confirmMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};

