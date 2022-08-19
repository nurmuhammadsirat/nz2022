export enum AccomodationType {
  CHECKIN,
  CURRENT,
  CHECKOUT,
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
  name: string;
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
};

export type GoogleSheetTripData = {
  accomodations: Accomodation[];
  vehicles: Vehicle[];
};
