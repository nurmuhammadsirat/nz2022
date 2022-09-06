export enum AccomodationType {
  CHECKIN,
  CURRENT,
  CHECKOUT,
}

export enum VehicleType {
  PICKUP,
  DROPOFF,
}

export enum FlightType {
  GOING,
  RETURN,
}

export type Accomodation = {
  checkIn: string;
  checkOut: string;
  location: string;
  type: string;
  name: string;
  confirmationID: string;
  url: string;
  address: string;
  googleMapsUrl: string;
  cost: string;
  currency: string;
};

export type Vehicle = {
  companyName: string;
  confirmationID: string;
  type: string;
  pickUpDate: string;
  pickUpTime: string;
  pickUpLocation: string;
  pickUpGoogleMapsUrl: string;
  dropOffDate: string;
  dropOffTime: string;
  dropOffLocation: string;
  dropOffGoogleMapsUrl: string;
  cost: string;
  currency: string;
  url: string;
};

export type Flight = {
  bookingNo: string;
  bookingType: string;
  departureLocation: string;
  departureDate: string;
  departureTime: string;
  arrivalLocation: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNo: string;
  flightDuration: string;
  flightType: string;
};

export type Activity = {
  name: string;
  activityUrl: string;
  date: string;
  time: string;
  confirmationNo: string;
  confirmationUrl: string;
  googleMapsUrl: string;
};

export type Flights = {
  [key in FlightType]: Flight[];
};

export type GoogleSheetTripResponse = {
  accomodations: Accomodation[];
  vehicles: Vehicle[];
  flights: Flight[];
  activities: Activity[];
};

export type AccessResponse = {
  isAllowed: boolean;
};
