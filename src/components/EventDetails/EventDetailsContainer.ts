import { connect } from 'react-redux';
import { selectEvent } from '../../actions';
import { State } from '../../reducers';

import EventDetails from './EventDetails';

export default connect(
  (state: State) => ({
    event: state.events.selectedEvent
  }),
  (dispatch) => ({
    onBackClick: () => { dispatch(selectEvent()); }
  })
)(EventDetails);
