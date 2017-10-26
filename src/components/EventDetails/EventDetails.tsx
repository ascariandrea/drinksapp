import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Guest from '../EventList/Guest';
import { Event, EventComment } from '../../models';

import './eventDetails.css';

interface EventDetailsProps {
  event: Event;
  onBackClick: () => void;
}

const Comment = (comment: EventComment) => (
  <div key={comment.timestamp} className='media'>
    <figure className='media-left'>
      <p className='image is-48x48'>
        <img src={comment.user.avatarUrl} />
      </p>
    </figure>
    <div className='media-content'>
      <div className='content'>
        <p>
          <strong>{comment.user.name}</strong>
          {comment.message}
        </p>
        <p>{moment(comment.timestamp).fromNow()}</p>
      </div>
    </div>
  </div>
);

export default class EventDetails extends React.Component<EventDetailsProps> {
  render() {
    const { event, onBackClick } = this.props;
    if (!event) {
      return null;
    }
    return (
      <div className='event-details'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-header-title'>
              {event.title}
            </div>
            <Link to='/' onClick={onBackClick} className='card-header-icon' aria-label='back'>
              <span className='icon'>
                <i className='fa fa-arrow-left' aria-hidden='true' />
              </span>
            </Link>
          </div>
          <div className='card-content'>
            <div className='media'>
              <div className='media-left'>
                <figure className='image is-48x48'>
                  <img src={event.creator.avatarUrl} alt='Creator profile url' />
                </figure>
              </div>
              <div className='media-content'>
                <p className='title is-4'>{event.creator.name}</p>
                <p className='subtitle is-6'>@johnsmith</p>
                <div className='content'>
                  {moment(event.time).fromNow()} at {event.location.name}
                </div>
              </div>
            </div>

            <div className='content'>

              <div className='guests'>
                <div className='subtitle is-6'>Guests</div>
                <div className='content'>
                  {event.guests.map((g) => <Guest key={g.name} guest={g} />)}
                </div>
              </div>
              <div className='comments'>
                <div className='subtitle is-6'>Comments</div>
                <div className='content'>
                  {event.comments.map(Comment)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
