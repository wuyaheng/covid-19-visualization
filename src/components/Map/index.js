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


        var fixUndefined = (item) => (typeof (item) == 'undefined' ? 'Unknown' : item); 


      function chooseColor(x) {
        if (x > 20000000) {
          return "#3B0000"
        } else if (x > 10000000) {
          return "#4F1818"
        } else if (x >= 5000000) {
          return "#681A1A"
        } else if (x >= 2500000) {
          return "#87101a"
        } else if (x >= 1000000) {
          return "#a31420";
        } else if (x >= 100000) {
          return "#bc5059";
        } else if (x >= 10000) {
          return "#BD777A";
        } else if (x >= 1000) {
          return "#D0979A";
        } else if (x >= 500) {
          return "#E3B7BA";
        } else if (x >= 100) {
          return "#FFE6EA"
        } else {
          return "white"
        }
    }


    function numberWithCommas(x) {
      if (x !== undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } 
  }

                var geoJson = L.geoJson(props.pins, {
                style: function(feature) {
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
                        fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                        geoJson.resetStyle(event.target);
                    },
                    click: function(event) {
                      confirmMap.fitBounds(event.target.getBounds()); 
                    }
                    });
                    layer.bindTooltip("<h6><b>" + feature.properties.ADMIN + "</b></h6> <hr> <p><b>Confirmed: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.confirmed)) + "</b></p>"); 
                }
                }).addTo(confirmMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};

