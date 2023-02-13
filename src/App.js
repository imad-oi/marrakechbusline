import './header.css';
import { Button } from '@mui/material';
import './Bar.css';
import './weather.css';
import './feed.css'
import ExploreIcon from '@mui/icons-material/Explore';

import { useJsApiLoader , StandaloneSearchBox, DirectionsRenderer, GoogleMap, Autocomplete, Marker} from '@react-google-maps/api';
import { useRef, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh'
};


function App() {
  const [center, setCenter] = useState({lat: 31.62947 ,lng:-7.98108})
  const [map, setMap] = useState(/**@type google.maps.Map*/ null) ; 
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState('') ; 
  const [duration, setDuration] = useState('') ;

  /** @type React.MutableRefObject<HTMLInputElement> */
  const origineRef = useRef() ; 
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef() ; 

  const google = window.google;

  const {isLoaded} = useJsApiLoader({
  googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries:['places']
  })
  // , 'drawing', 'localContext', 'visualization'

  const calculateRoute = async ()=>{
    if(origineRef.current.value ==='' || destinationRef.current.value){
      return  ; 
    }
    const directionServices = new google.maps.DirectionsService() ;
    const results = await directionServices.route(
      {
        origin:origineRef.current.value , 
        destination: destinationRef.current.value , 
        travelMode:google.maps.TransitMode.BUS

      })

      setDirectionResponse(results)  ; 
      setDistance(results.routes[0].legs[0].distance.text) ; 
      setDuration(results.routes[0].legs[0].duration.text) ; 
      console.log(results);
  }


  const clearResponse = ()=>{
    setDirectionResponse(null) ;
     setDistance('') ; 
     setDuration('') ; 
     origineRef.current.value = '' ; 
     destinationRef.current.value = '' ; 

  }

  const  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      // console.log( navigator.geolocation.getCurrentPosition(showPosition));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  const showPosition = (position)=> {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    map.setCenter(new google.maps.LatLng(lat, lng));
    // setCenter(lat, lng)
    console.log(lat, lng) ; 
  }
  getLocation() ;

  return (
    <div className='App'>
    <div className="header">
        <div className="bar">
          <div className="recherche">
            <StandaloneSearchBox>
              <input 
              ref={origineRef}
              type="text" placeholder='origin' />
            </StandaloneSearchBox>
            <StandaloneSearchBox>
              <input
               ref={destinationRef}
              type="text" placeholder='destination' />
            </StandaloneSearchBox>
            <Button
              onClick={calculateRoute}
            variant='contained'> direction </Button>
            <Button
            onClick={()=> map.panTo(center)}
            ><ExploreIcon/></Button>
          </div>

          <div className="result">
            <p>Distance:{distance}</p>
            <p>Duration:{duration}</p>
          </div>
        </div>
          <div className="weather">

            {/* this bloc will be used soon */}
            35° C
          </div>
    </div>
      <div className='feed'>
        <GoogleMap
            center={center} 
            mapContainerStyle={containerStyle}
            zoom={10}
            options={{
              fullscreenControl:false
            }}
            onLoad={map=> setMap(map)}
            // onUnmount={onUnmount}
         >
          <Marker position={center}/>
                {
                  directionResponse && <DirectionsRenderer
                  directions={directionResponse}
                  />
                }
        </GoogleMap>
      </div>
    {/* <Test/> */}
      </div>
  );
}

export default App;
