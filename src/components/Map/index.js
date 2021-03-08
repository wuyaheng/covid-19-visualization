import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';
import moment from 'moment'


export default (props) => {
  React.useEffect(() => {

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
      } else {
        return "white"
      }
  }

  function numberWithCommas(x) {
    if (x !== undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 
}

    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {

      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);

      // Initialize all of the LayerGroups we'll be using
      var layers = {
        ConfirmCases: new L.LayerGroup(),
        DeathCases: new L.LayerGroup(),
        RecoverCases: new L.LayerGroup()
      };

      const confirmMap = L.map("mapid", {
        layers: [
          layers.ConfirmCases,
          layers.DeathCases,
          layers.RecoverCases
        ]
      }).setView([props.lat, props.lon], 2);

      
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

      // Create an overlays object to add to the layer control
      var overlays = {
        "Confirm Cases": layers.ConfirmCases, 
        "Death Cases": layers.DeathCases,
        "Recover Cases": layers.RecoverCases
      }; 

      // Create a control for our layers, add our overlay layers to it
      L.control.layers(overlays).addTo(confirmMap);

            // var info = L.control({
            //   position: "bottomright"
            // });
      
            // info.onAdd = function() {
            //   var div = L.DomUtil.create("div", "legend");
            //   div.innerHTML += "<span class='dot first'></span>0 - 500<br/>"; 
            //   div.innerHTML += "<span class='dot second'></span>500 - 1000<br/>"; 
            //   div.innerHTML += "<span class='dot third'></span>1000 - 10000<br/>";
            //   div.innerHTML += "<span class='dot four'></span>10000 - 100000<br/>";  
            //   div.innerHTML += "<span class='dot five'></span>100000 - 1000000<br/>"; 
            //   div.innerHTML += "<span class='dot six'></span>1000000 - 2500000<br/>"; 
            //   div.innerHTML += "<span class='dot seven'></span>2500000 - 5000000<br/>"; 
            //   div.innerHTML += "<span class='dot eight'></span>5000000 - 10000000<br/>"; 
            //   div.innerHTML += "<span class='dot nine'></span>10000000 - 20000000<br/>"; 
            //   div.innerHTML += "<span class='dot ten'></span>20000000 + <br/>"; 
            //   return div;
            // }; 
    
            // info.addTo(confirmMap);

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
                    layer.addTo(layers.ConfirmCases).bindTooltip("<h6><b>" + feature.properties.ADMIN + "</b></h6> <hr> <p><b>Confirmed: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.confirmed)) + "</b></p>"); 
                }
                }).addTo(confirmMap);



                var geoJson = L.geoJson(props.pins, {
                  style: function(feature) {
                      return {
                      color: "white",
                      fillColor: chooseColor(feature?.properties?.covid?.deaths),
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
                      layer.addTo(layers.DeathCases).bindTooltip("<h6><b>" + feature.properties.ADMIN + "</b></h6> <hr> <p><b>Death: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.deaths)) + "</b></p>"); 
                  }
                  }).addTo(confirmMap);

                  var geoJson = L.geoJson(props.pins, {
                    style: function(feature) {
                        return {
                        color: "white",
                        fillColor: chooseColor(feature?.properties?.covid?.recovered),
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
                        layer.addTo(layers.RecoverCases).bindTooltip("<h6><b>" + feature.properties.ADMIN + "</b></h6> <hr> <p><b>Recover: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.recovered)) + "</b></p>"); 
                    }
                    }).addTo(confirmMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};

