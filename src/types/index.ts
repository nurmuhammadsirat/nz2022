export enum AccomodationType {
  CHECKIN,
  CURRENT,
  CHECKOUT,
}

export enum VehicleType {
  PICKUP,
  DROPOFF,
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
};

export type GoogleSheetTripData = {
  accomodations: Accomodation[];
  vehicles: Vehicle[];
  flights: Flight[];
};
