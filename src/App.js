import React, { Component } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import MapBox from "./components/MapBox/index";
import geodata from "./data/countries.json";
import { fetchData } from './API/index';
import axios from "axios";


const url = 'https://covid19.mathdro.id/api';

class App extends Component {
  state = {
    geo: [],
    confirm: [],
    newdata: {},
    newcountry: ''
  }


  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({newdata: fetchedData});
    this.fetchdata()
    this.fetchConfirm()
  }

  handleCountryChange = async (newcountry) => {
    const fetchedData = await fetchData(newcountry);
    this.setState({newdata: fetchedData, newcountry: newcountry})
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

    const { newdata, newcountry } = this.state;

      return (
        <>
          <nav className="navbar navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Covid-19 Visualization
          </a>
        </div>
      </nav>
        <div className="container-fluid mt-2">
        <div className="row mb-0">
        <div className="col-md-4 text-center">
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
      <Cards newdata = {newdata} />
      <Chart newdata={newdata} newcountry={newcountry}/>

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
