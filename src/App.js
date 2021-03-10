import React, { Component } from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import MapBox from "./components/MapBox/index";
import geodata from "./data/countries.json";
import { fetchCountryDetail, fetchCountries } from './API/index';
import axios from "axios";


const url = 'https://covid19.mathdro.id/api';

class App extends Component {
  state = {
    geo: [],
    allcountriesdetail: [],
    countrydetail: {},
    sel_country: '',
    iso: ''
  }


  async componentDidMount() {
    const fetchCountryDetailData = await fetchCountryDetail();
    this.setState({countrydetail: fetchCountryDetailData});
    const fetchedCountries = await fetchCountries()
    fetchedCountries.map((aCountry) => {
      if (aCountry[0]===this.state.sel_country) {
        this.setState({iso: aCountry[1]})
      }
    })
    this.filterData()
    this.fetchAllcountriesdetail()
  }


  handleCountryChange = async (sel_country) => {
    const fetchCountryDetailData = await fetchCountryDetail(sel_country);
    this.setState({countrydetail: fetchCountryDetailData, sel_country: sel_country});
    const fetchedCountries = await fetchCountries()
    fetchedCountries.map((aCountry) => {
      if (aCountry[0]===this.state.sel_country) {
        this.setState({iso: aCountry[1]})
      }
    })
    this.filterData()
  }


  filterData = () => {
    if (this.state.sel_country !== '') {
        let filteredGeo = geodata.features.filter((ele) => ele.properties.ISO_A3==this.state.iso && ele.properties.ISO_A3!=='-99');
        this.setState({
          geo: filteredGeo
        })
    } else {
      this.setState({
        geo: geodata.features
      })
    }
  }



  fetchAllcountriesdetail = async () => { 
      const res = await axios.get(`${url}/confirmed`)
      this.setState({
        allcountriesdetail: res.data
    })
  }


  render() { 

    let data = {
      geoData: this.state.geo,
      allCountriesDetailData: this.state.allcountriesdetail 
    }

    let condensedData = data.allCountriesDetailData.reduce(function(dict, item) {
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

    const { countrydetail, sel_country } = this.state;

      return (
        <>
          <nav className="navbar navbar-light">
        <div className="container-fluid">
          <p className="navbar-brand">
            Covid-19 Visualization
          </p>
        </div>
      </nav>
        <div className="container-fluid mt-2">
        <div className="row mb-0">
        <div className="col-md-4 text-center">
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
      <Cards newdata = {countrydetail} />
      <Chart newdata={countrydetail} newcountry={sel_country}/>

        </div>
        <div className="col-md-8 mb-3">
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
