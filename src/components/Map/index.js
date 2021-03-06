import React from "react";
import L from "leaflet";


export default (props) => {
  React.useEffect(() => {

    var fixUndefined = (item) => (typeof (item) == 'undefined' ? 'Unknown' : item); 

    function chooseConfirmColor(d) {
      return d > 20000000 ? '#7f0000' :
            d > 10000000  ? '#b30000' :
            d > 5000000   ? '#d7301f' :
            d > 2500000   ? '#ef6548' :
            d > 1000000   ? '#fc8d59' :
            d > 100000    ? '#fdbb84' :
            d > 10000     ? '#fdd49e' :
            d > 1000      ? '#fee8c8' :
            d > 500       ? '#fff7ec' :
                            'white';
  }


  function chooseRecoverColor(d) {
    return d > 10000000 ? '#00441b' :
          d > 5000000   ? '#006d2c' :
          d > 2500000   ? '#238b45' :
          d > 1000000   ? '#41ae76' :
          d > 100000    ? '#66c2a4' :
          d > 10000     ? '#99d8c9' :
          d > 1000      ? '#ccece6' :
          d > 500       ? '#e5f5f9' :
          d > 100       ? '#f7fcfd' :
                          'white';
}


function chooseDeathColor(d) {
  return d > 500000 ? '#000000' :
         d > 250000 ? '#252525' :
         d > 100000 ? '#525252' :
         d > 50000  ? '#737373' :
         d > 25000  ? '#969696' :
         d > 10000  ? '#bdbdbd' :
         d > 5000   ? '#d9d9d9' :
         d > 1000   ? '#e7e7e7' :
         d > 500    ? '#f3f3f3' :
                      'white';
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

      var layers = {
        ConfirmCases: new L.LayerGroup(),
        RecoverCases: new L.LayerGroup(),
        DeathCases: new L.LayerGroup()
      };

      let confirmMap; 
      props.pins.length > 20 ? 
      confirmMap = L.map("mapid", {layers: [layers.ConfirmCases]}).setView([props.lat, props.lon], 2) : confirmMap = L.map("mapid", {layers: [layers.ConfirmCases]}).setView([props.lat, props.lon], 4)
   
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(confirmMap);

      var baseMaps = {
        "Confirmed Cases": layers.ConfirmCases, 
        "Recovered Cases": layers.RecoverCases,
        "Death Cases": layers.DeathCases
      }; 

      L.control.layers(baseMaps, null, {collapsed:false}).addTo(confirmMap);


      var ConfirmLegend = L.control({position: "bottomleft"});
      ConfirmLegend.onAdd = function () {
        let Confirmdiv = L.DomUtil.create('div', 'info legend'),
            confirmGrades = [0, 500, 1000, 10000, 100000, 1000000, 2500000, 5000000, 10000000, 20000000];
            Confirmdiv.innerHTML += "<p class='legendLabel'>Confirmed Cases</p>"
        for (var i = 0; i < confirmGrades.length; i++) {
              Confirmdiv.innerHTML +=
                '<i style="background:' + chooseConfirmColor(confirmGrades[i] + 1) + '"></i> ' +
                confirmGrades[i] + (confirmGrades[i + 1] ? '&ndash;' + confirmGrades[i + 1] + '<br>' : '+');
        }
        return Confirmdiv;
    };


      var RecoverLegend = L.control({position: "bottomleft"});
      RecoverLegend.onAdd = function () {
          let Recoverdiv = L.DomUtil.create('div', 'info legend'),
              recoverGrades = [0, 100, 500, 1000, 10000, 100000, 1000000, 2500000, 5000000, 10000000];
              Recoverdiv.innerHTML += "<p class='legendLabel'>Recovered Cases</p>"
          for (var i = 0; i < recoverGrades.length; i++) {
                Recoverdiv.innerHTML +=
                  '<i style="background:' + chooseRecoverColor(recoverGrades[i] + 1) + '"></i> ' +
                  recoverGrades[i] + (recoverGrades[i + 1] ? '&ndash;' + recoverGrades[i + 1] + '<br>' : '+');
          }
          return Recoverdiv;
      };



    var DeathLegend = L.control({position: "bottomleft"});
    DeathLegend.onAdd = function () {
      let Deathdiv = L.DomUtil.create('div', 'info legend'),
          deathGrades = [0, 500, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000];
          Deathdiv.innerHTML += "<p class='legendLabel'>Death Cases</p>"
      for (var i = 0; i < deathGrades.length; i++) {
            Deathdiv.innerHTML +=
              '<i style="background:' + chooseDeathColor(deathGrades[i] + 1) + '"></i> ' +
              deathGrades[i] + (deathGrades[i + 1] ? '&ndash;' + deathGrades[i + 1] + '<br>' : '+');
      }
      return Deathdiv;
  };


  
  ConfirmLegend.addTo(confirmMap);
  var currentLegend = ConfirmLegend;


  confirmMap.on('baselayerchange', function (eventLayer) {
    console.log(eventLayer.name)
    if (eventLayer.name === 'Confirmed Cases') {
      confirmMap.removeControl(currentLegend);
        currentLegend = ConfirmLegend;
        ConfirmLegend.addTo(confirmMap);
    } else if (eventLayer.name === 'Recovered Cases') {
      confirmMap.removeControl(currentLegend);
        currentLegend = RecoverLegend;
        RecoverLegend.addTo(confirmMap);
    } else if  (eventLayer.name === 'Death Cases') {
      confirmMap.removeControl(currentLegend);
        currentLegend = DeathLegend;
        DeathLegend.addTo(confirmMap);
    }
  })


                var geoJson = L.geoJson(props.pins, {
                style: function(feature) {
                    return {
                    color: "white",
                    fillColor: chooseConfirmColor(feature?.properties?.covid?.confirmed),
                    fillOpacity: 0.7,
                    weight: 1.5
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                    mouseover: function() {
                      this.setStyle({
                        fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                      this.setStyle({
                        fillOpacity: 0.7
                      })
                    },
                    click: function(event) {
                      confirmMap.fitBounds(event.target.getBounds()); 
                    }
                    });
                    layer.addTo(layers.ConfirmCases).bindTooltip("<h6><b>" + feature?.properties?.ADMIN + "</b></h6> <hr> <p><b>Confirmed: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.confirmed)) + "</b></p>"); 
                }
                }).addTo(confirmMap);

                  var geoJson = L.geoJson(props.pins, {
                    style: function(feature) {
                        return {
                        color: "white",
                        fillColor: chooseRecoverColor(feature?.properties?.covid?.recovered),
                        fillOpacity: 0.7,
                        weight: 1.5
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        layer.on({
                        mouseover: function() {
                          this.setStyle({
                            fillOpacity: 0.9
                            });
                        },
                        mouseout: function() {
                          this.setStyle({
                            fillOpacity: 0.7
                          })
                        },
                        click: function(event) {
                          confirmMap.fitBounds(event.target.getBounds()); 
                        }
                        });
                        layer.addTo(layers.RecoverCases).bindTooltip("<h6><b>" + feature?.properties?.ADMIN + "</b></h6> <hr> <p><b>Recover: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.recovered)) + "</b></p>"); 
                    }
                    })


                    var geoJson = L.geoJson(props.pins, {
                      style: function(feature) {
                          return {
                          color: "white",
                          fillColor: chooseDeathColor(feature?.properties?.covid?.deaths), 
                          fillOpacity: 0.7,
                          weight: 1.5
                          };
                      },
                      onEachFeature: function(feature, layer) {
                          layer.on({
                          mouseover: function() {
                              this.setStyle({
                              fillOpacity: 0.9
                              });
                          },
                          mouseout: function() {
                              this.setStyle({
                                fillOpacity: 0.7
                              })
                          },
                          click: function(event) {
                            confirmMap.fitBounds(event.target.getBounds()); 
                          }
                          });
                          layer.addTo(layers.DeathCases).bindTooltip("<h6><b>" + feature?.properties?.ADMIN + "</b></h6> <hr> <p><b>Death: " + numberWithCommas(fixUndefined(feature?.properties?.covid?.deaths)) + "</b></p>"); 
                      }
                      })
    }
    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};