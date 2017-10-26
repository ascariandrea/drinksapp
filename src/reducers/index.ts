import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { Event } from '../models';
import { Location } from 'history';

export interface EventsState {
  events?: Event[];
  selectedEvent?: Event;
}

interface Action {
  type: 'SELECT_EVENT' | 'EVENTS_LOADED';
  id?: number;
  events?: Event[];
}

const initialState: EventsState = {
  events: undefined,
  selectedEvent: undefined
};

const events = (state = initialState, action: Action): EventsState => {
  switch (action.type) {
    case 'SELECT_EVENT':
      return {
        ...state,
        selectedEvent: (state.events || []).find(e => e.id === action.id)
      };
    case 'EVENTS_LOADED':
      return {
        ...state,
        events: action.events,
      };
    default: return state;
  }
};

export interface State {
  events: EventsState;
  routerReducer: {
    location: Location
  };
}

export default combineReducers({ events, routerReducer });
