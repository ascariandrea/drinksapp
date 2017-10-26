import * as React from 'react';
import { matchPath, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EventsMap from './components/EventsMap';
import EventList from './components/EventList';
import EventDetail from './components/EventDetails';
import { getEvents } from './api';
import { eventsLoaded, selectEvent } from './actions';
import { Event } from './models';
import { State } from './reducers';
import { Location } from 'history';
import './App.css';

interface AppProps {
  events?: Event[];
  selectedEvent?: Event;
  location?: Location;
  onEventClick: (eventId: Event['id']) => void;
  onEventsLoaded: (events: Event[]) => void;
  onBack: () => void;
}

class App extends React.Component<AppProps> {

  componentDidMount() {
    getEvents()
      .then((events: Event[]) => {
        this.props.onEventsLoaded(events);

        if (this.props.location) {
          const match = matchPath<{ id: string }>(this.props.location.pathname, {
            path: '/events/:id',
            exact: true,
            strict: false
          });

          if (match && match.isExact) {
            this.props.onEventClick(parseInt(match.params.id, 10));
          }
        }
      });
  }

  render() {
    const {
      events = [],
      selectedEvent,
      onEventClick,
      onBack
    } = this.props;

    return (
      <div className='App'>
        <div className='hero'>
          <div className='hero-head'>
           <div className='title'>DrinkApp</div>
           <nav className='breadcrumb' aria-label='breadcrumbs'>
              <ul>
                <li><Link onClick={onBack} to='/'>Events</Link></li>
                {selectedEvent && <li>{selectedEvent.title}</li>}
              </ul>
            </nav>
          </div>
        </div>
        <div className='columns is-gapless'>
          <div className='column is-three-quarters'>
            <EventsMap
              events={events}
              onEventClick={onEventClick}
              selectedEvent={selectedEvent}
            />
          </div>
          <div className='column is one-quarter'>
            <Switch location={this.props.location}>
              <Route component={EventList} />
              <Route path='events/:id' component={EventDetail} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: State): Partial<AppProps> => {
    return {
      events: state.events.events,
      selectedEvent: state.events.selectedEvent,
      location: state.routerReducer.location
    };
  },
  (dispatch) => ({
    onEventClick: (id: number) => {
      dispatch(selectEvent(id));
    },
    onEventsLoaded: (events: Event[]) => {
      dispatch(eventsLoaded(events));
    },
    onBack: () => {
      dispatch(selectEvent());
    }
  })
)(App);
