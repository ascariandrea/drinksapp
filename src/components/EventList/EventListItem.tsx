import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Guest from './Guest';
import { Event } from '../../models';

import './eventListItem.css';

const beer = require('../../assets/beer-icon.png');
const glass = require('../../assets/cocktail-icon.png');
const coffee = require('../../assets/coffee-icon.png');
const milkshakes = require('../../assets/milkshake-icon.png');

interface Props {
  event: Event;
  onEventClick: (eventId: Event['id']) => void;
}

const getEventTypeSrc = (event: Event) => {
  switch (event.type) {
    case 'COCKTAILS': return glass;
    case 'COFFEES': return coffee;
    case 'MILKSHAKES': return milkshakes;
    default: return beer;
  }
};

export default class EventListItem extends React.PureComponent<Props> {

  render() {
    const { event, onEventClick } = this.props;

    return (
      <div className='event-list-item'>
        <div className='card'>
          <div className='card-content'>

            <div className='media'>
              <div className='media-left'>
                <figure className='image is-16x16'>
                  <img src={getEventTypeSrc(event)} alt='Placeholder image' />
                </figure>
              </div>
              <div className='media-content'>
                <p className='title is-4'>{event.title}</p>
                <p className='subtitle is-5'>{event.creator.name}</p>
              </div>
            </div>

            <div className='content'>
              <div className='guests'>
                <div className='title is-6'>Guests</div>
                <div className='guests-list'>
                  {event.guests.map(g => <Guest key={g.name} guest={g} />)}
                </div>
                <p className='subtitle is-6'>{moment(event.time).toNow()}</p>
              </div>
            </div>
          </div>

          <footer className='card-footer'>
            <Link
              className='card-footer-item'
              onClick={() => onEventClick(event.id)}
              to={`/events/${event.id}`}
            >
             Details
            </Link>
          </footer>
        </div>
       </div>
    );
  }
}
