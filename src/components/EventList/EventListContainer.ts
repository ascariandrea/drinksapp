import { connect } from 'react-redux';
import EventList from './EventList';
import { selectEvent } from '../../actions';
import { State } from '../../reducers';
import { Event } from '../../models';

export default connect(
  (state: State) => {
    return {
      events: state.events.events
    };
  },
  dispatch => ({
    onEventClick: (eventId: Event['id']) => {
      dispatch(selectEvent(eventId));
    }
  })
)(EventList);
