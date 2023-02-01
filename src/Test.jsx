import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

export default function Map(props) {
    function handleLoad() {}
  
    function hanldePlacesChanged() {}
  
    return (
      <LoadScript id="script-loader" googleMapsApiKey="AIzaSyCbbXU8ngm4dAUuRSA0xVKf2_yPI4ve_14" libraries={["places"]}>
        <GoogleMap
          zoom={5}
          center={{ lat: -25.0270548, lng: 115.1824598 }}
          id="map"
        >
          <StandaloneSearchBox
            // onLoad={handleLoad}
            // onPlacesChanged={hanldePlacesChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
    );
  }