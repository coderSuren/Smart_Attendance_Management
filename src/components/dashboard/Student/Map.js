import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
function GLMap() {
  const [lng, setLng] = useState(76.8977381437845);
  const [lat, setLat] = useState(10.906103301151411);

  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid red",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 18,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
      <h3>Longitude: 76.8977381437845;</h3>
      <h3>Latitude: 10.906103301151411</h3>
    </div>
  );
}

export default GLMap;