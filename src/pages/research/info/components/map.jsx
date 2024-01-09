import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Map = ({ coordinates,bedrijf }) => {
  const position = coordinates || [51.505, -0.09];

  return (
      <div className='card'>
        <MapContainer center={position} zoom={13} style={{ height: '80%', width: '100%' }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
              <Popup>
                  {bedrijf.bedrijfsnaam}
                  <br/> {bedrijf.straat} {bedrijf.nummer}
                  <br/> {bedrijf.plaats} {bedrijf.postcode}
                  <br/> <a
                  href={bedrijf.websiteUrl.startsWith('http') ? bedrijf.websiteUrl : `http://${bedrijf.websiteUrl}`}
                  target="_blank" rel="noopener noreferrer">
                  Bezoek  website van het bedrijf
              </a>


              </Popup>
          </Marker>
        </MapContainer>
      </div>
  );
};

export default Map;
