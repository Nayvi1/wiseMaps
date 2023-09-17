import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/useCity";
import useURLPosition from "../hooks/useURLPosition";
/* eslint-disable react/prop-types */
function Map() {
  const [position, setPosition] = useState([40.0, 0.0]);

  const [lat, lng] = useURLPosition();
  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  const { cities } = useCity();
  console.log(cities);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((el) => {
          return (
            <Marker key={el.id} position={[el.position.lat, el.position.lng]}>
              <Popup>{el.cityName}</Popup>
            </Marker>
          );
        })}
        <ChangeMap position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;
