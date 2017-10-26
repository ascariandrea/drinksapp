import { Event } from '../models';

export const eventsLoaded = (events: Event[]) => {
  return {
    type: 'EVENTS_LOADED',
    events
  };
};

export const selectEvent = (eventId?: Event['id']) => {
  return {
    type: 'SELECT_EVENT',
    id: eventId
  };
};
