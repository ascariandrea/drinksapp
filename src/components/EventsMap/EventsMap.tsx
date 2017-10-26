import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { Event } from '../../models';

import './eventsMap.css';

const GMAPS_API_KEY = 'AIzaSyD-jFg2HhzK-Tjnv3_1iOUIU_Qx3-OlPuU';
// tslint:disable-next-line  max-line-length
const GMAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

interface EventsMapProps {
  events?: Event[];
  selectedEvent?: Event;
  onEventClick: (eventId: number) => void;
}

const EventsGmaps = withScriptjs(withGoogleMap((props: EventsMapProps) => {
  const {
    events = [], onEventClick,
    selectedEvent
  } = props;

  const defaultZoom = 10;
  const zoom = selectedEvent ? 25 : defaultZoom;

  const defaultCenter = { lat: 51.5081134, lng:  -0.1270056 };
  const center = selectedEvent ? {
    lat: selectedEvent.location.latitude,
    lng: selectedEvent.location.longitude
  } : defaultCenter;

  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      zoom={zoom}
      center={center}
    >
      <MarkerClusterer averageCenter={true}>
      {events.map(e => (
        <Marker
          key={e.id}
          position={{ lat: e.location.latitude, lng: e.location.longitude }}
          onClick={() => onEventClick(e.id)}
        />
      ))}
      </MarkerClusterer>
    </GoogleMap>
  );
}));

export default function EventsMap(props: EventsMapProps) {
  return (
    <EventsGmaps
      {...props}
      googleMapURL={GMAPS_URL}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div className='events-map' />}
      mapElement={<div className='map' />}
    />
  );
}
