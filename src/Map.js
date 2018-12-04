import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css'
import Geocode from "react-geocode";

// MDS Matt Shields note
// GEN package creator note

// MDS yarn add gogole-map-react
// MDS yarn add react-app-env
// MDS yarn add dotenv-webpack  *NOTE: frontend env version*

// MDS Get your free Google API key from google, free unless it gets 25K+ hits per week.
// MDS Put key in env file

// MDS This object is the marker on the map, it is just a JSX delement, it can be modified (see my class 'circle')
const AnyReactComponent = ({ text }) => <div className='circle'>{text}</div>;
// MDS Example of a second made-up object, based roughly on Chicago lat, long
const AnyReactComponent2 = ({ text }) => <div className='circle'>{text}</div>;

class SimpleMap extends Component {
  constructor(){
    super()
    this.state = {
      place: 'Indianapolis',
      center: { // MDS Center needed for default zoom
        lat: 0,
        lng: 0
    },
    zoom: 11, // MDS Initial zoom of map
    coordsLoaded: false,
      }
    }
    // MDS Geocode is a promise, so we must wait until the promise is returned to render the map 
  componentDidMount = () => {
    this.getCoordinates();
    this.setState({
      coordsLoaded: true
    })
  }

  getCoordinates = () => {
        // GEN set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY); // MDS This appears toi be required.
        // GEN Enable or disable logs. Its optional.
        Geocode.enableDebug();

        Geocode.fromAddress(this.state.place).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            const center = {lng: lng, lat: lat}
            console.log(lat, lng);
            this.setState({
              center: center
            })
          },
          error => {
            console.error(error);
          }
        );
  };

  render() {
    return (
      // GEN Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        { this.state.coordsLoaded ?
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent 
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text={this.state.tower}
          />
          <AnyReactComponent2
            lat={42} // rough coordinate for Chicago
            lng={-88} // rough coordinate for Chicago
            text={'Chicagoland'}
          />
        </GoogleMapReact>
        : <></> }
      </div>
    );
  }
}
 
export default SimpleMap;