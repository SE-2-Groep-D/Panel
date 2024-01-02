import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Map = ({ coordinates }) => {
  const position = coordinates || [51.505, -0.09];

  return (
      <div className='card'>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              Hier is het bedrijf. <br /> Dit is een aangepaste popup.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
  );
};

export default Map;
