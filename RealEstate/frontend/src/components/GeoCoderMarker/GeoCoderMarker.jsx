import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);
  const apiKey = "AAPTxy8BH1VEsoebNVZXo8HurPUqKuZd3oX9CobH1KikffWv15JCcvfiI5TfpSX_5ltE1G98D3B2Yc1LcioY05Y7NsLeK1YmIWgiKB3fsQhTO5KYnWOK_-Cke0jqsL5DZ5NuS_YoarGfZq5YMKMONbuz4v5QFGGH3ONEk39kq6Vu8apP0-S-Lv0UYM8oA2KkDTE9oluzcl2z-6QkcZHSJaFhA8I--V6fwD4ATPy9vQn0kJSXn8Q_ISBC59ocBTSXRLfpAT1_OybJt9sH";

  useEffect(() => {
    if (address) {
      ELG.geocode({ apikey: apiKey }).text(address).run((err, results) => {
        if (err) {
          console.error('Geocoding error:', err);
          return;
        }
        if (results?.results?.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        } else {
          console.warn('No results found for the given address.');
        }
      });
    }
  }, [address, map, apiKey]);

  

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
