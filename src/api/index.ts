import axios from 'axios';
import { Event } from '../models';

const client = axios.create({
  baseURL: 'https://mock-api.drinks.test.siliconrhino.io'
});

export const getEvents = (): Promise<Event[]> =>
  client.get('/events').then((results) => results.data);

export const getEvent = (eventId: number) => client.get(`/events/${eventId}`);
