import * as React from 'react';
import { Event } from '../../models';
import EventListItem from './EventListItem';

import './eventList.css';

interface Props {
  events: Event[];
  onEventClick: (eventId: Event['id']) => void;
}

export default class EventList extends React.PureComponent<Props> {

  render() {
    const { events = [], onEventClick } = this.props;
    return (
      <div className='event-list'>
        {events.map(e => <EventListItem key={e.id} event={e} onEventClick={onEventClick} />)}
      </div>
    );
  }
}
