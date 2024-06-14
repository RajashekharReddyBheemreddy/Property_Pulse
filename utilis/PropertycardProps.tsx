export type PropertyProps = {
  _id: string;
  owner?: string;
  name: string;
  type: string;
  description?: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: Number;
  baths: Number;
  square_feet: Number;
  amenities: string[];
  rates: {
    weekly?: Number;
    monthly?: Number;
    nightly?: Number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images?: any;
  is_featured: Boolean;
  createdAt: string;
  updatedAt: string;
};

interface Location {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

interface Rates {
  weekly: string;
  monthly: string;
  nightly: string;
}

interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface FieldState {
  type: string;
  name: string;
  description: string;
  location: Location;
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images?: any;
  owner?: string;
}

export type MessageProps = {
  createdAt: Date;
  _id: string;
  sender: any;
  recipient: string;
  property: PropertyProps;
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
};
