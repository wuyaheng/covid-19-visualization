import React, { Component } from 'react';
import './App.css';
import MapBox from "./components/MapBox/index";
import geodata from "./data/world.json";
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
          <MapBox results = {data}/>
          </div>
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;
