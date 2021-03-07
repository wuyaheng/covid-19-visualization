import React, { Component } from 'react';
import './App.css';
import MapBox from "./components/MapBox/index";
import geodata from "./data/countries.json";
import axios from "axios";

const url = 'https://covid19.mathdro.id/api';

class App extends Component {
  state = {
    geo: [],
    confirm: [] 
  }

  componentDidMount() {
        this.fetchdata()
        this.fetchConfirm()
  }

  fetchdata = () => {
      this.setState({
        geo: geodata.features
      })
  } 

  fetchConfirm = async () => { 
      const res = await axios.get(`${url}/confirmed`)
      this.setState({
      confirm: res.data
    })
  }


  render() { 

    let data = {
      geoData: this.state.geo,
      confirmData: this.state.confirm 
    }

    let condensedData = data.confirmData.reduce(function(dict, item) {
      let { confirmed, deaths, recovered, iso3, lastUpdate, lat, long } = item;
      let country = dict[iso3]
      if(country) {
        country.deaths+=deaths
        country.confirmed+=confirmed
        country.recovered+=recovered
        country.lastUpdate=lastUpdate
        country.lat=lat || country.lat
        country.long=long ? long: country.long
      } else {
        dict[iso3] = {
          confirmed,
          deaths,
          recovered,
          lastUpdate,
          lat,
          long
        }
      }
      return dict;
    },{})

    const updatedGeoData = data.geoData.map((item) => {
      const iso3 = item.properties.ISO_A3;
      const countryData = condensedData[iso3];
      if(countryData) {
        item.properties.covid = countryData
      }

      return item;

    })

    console.log(updatedGeoData)


      return (
        <>
          <nav>
            <div className="nav-wrapper #455a64 blue-grey darken-2">
              <a href="#" className="brand-logo center">Covid-19 Visualization</a>
            </div>
          </nav>
        <div className="container-fluid mt-2">
        <div className="row mb-0">
        <div className="col-md-4">

        </div>
        <div className="col-md-8">
        <div className="card">
          <MapBox results = {updatedGeoData}/>
          </div>
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;
