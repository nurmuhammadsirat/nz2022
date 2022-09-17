import { Section } from '../types';

export default {
  contentBackground: '#FFFFFF',
  headerBackground: '#371B58',
  headerText: '#E4F9F5',
  footerBackground: '#3F4E4F',
  footerText: '#FFFFFF',
  cardBackground: '#FFFFFF',
  sectionTitle: {
    [Section.FLIGHT]: { background: '#C21010', text: '#FFFFFF' },
    [Section.ACCOMODATION]: { background: '#42855B', text: '#FFFFFF' },
    [Section.ACTIVITIES]: { background: '#11999E', text: '#FFFFFF' },
  },
  calendar: {
    month: {
      background: '#EB1D36',
      text: '#FFFFFF',
    },
    date: {
      background: '#FFFFFF',
      text: '#000000',
    },
    day: {
      background: '#FFFFFF',
      text: '#EB1D36',
    },
  },
  infoTitle: '#9C9EFE',
  border: '#DFDFDE',
  trafficLight: {
    red: '#CC3232',
    amber: '#E7B416',
    green: '#2DC937',
  },
  driving: '#11999E',
  link: '#7F5283',
  departingFlight: '#0096FF',
  arrivalFlight: '#42855B',
};
