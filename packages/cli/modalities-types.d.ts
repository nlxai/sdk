// Auto-generated from NLX
// Please do not edit manually

export interface JakubTModality {}

export type Citation = {
  score?: number;
  fileName?: string;
  pageNumber?: number;
  content?: string;
}[];

export interface NRGLocation {
  location?: string;
}

export type ExampleCarouselModality = {
  leftText?: string;
  rightText?: string;
  id?: string;
  imageUrl?: string;
}[];

export interface Flights {
  /**
   * A list of possible flights the user may be interested in.
   */
  flights?: {
    /**
     * Airport code of the flight origin
     */
    from?: string;
    /**
     * The cost of this flight in dollars
     */
    cost?: number;
    /**
     * Economy class
     */
    economy?: boolean;
    id?: string;
    /**
     * Airport code of the flight destination
     */
    to?: string;
    /**
     * A URL to an image illustrating a desirable view at the destination
     */
    imageUrl?: string;
  }[];
}

export interface JakubTestModality {
  Bar?: boolean;
  Foo?: string;
}

export type VishalTestModality = string;

export type UserInfoCapture = string;

export interface KubaReel {
  "Image URL"?: string;
  Header?: string;
  Price?: number;
}

export interface VWPlotUI {
  key1?: string;
  key2?: string;
}

export type HotelCarousel = {
  name?: string;
  location?: string;
  price?: number;
}[];

export type VishalTest = string;

export interface Speech {
  base64Audio?: string;
}

export interface Gif {
  title?: string;
  url?: string;
}

export interface BookingSummary {
  return_flights?: {
    duration?: number;
    price?: number;
    origin?: string;
    destination?: string;
    departureDateTime?: string;
    arrivalDateTime?: string;
    id?: string;
    airline?: string;
    class?: string;
    flightNumber?: string;
  }[];
  description?: string;
  hotels?: {
    image?: string;
    tier?: string;
    total_cost?: number;
    name?: string;
    cost_per_night?: number;
    party_size?: number;
    location?: string;
    availability?: {
      arrival_date?: string;
      departure_date?: string;
    };
    id?: string;
  }[];
  outbound_flights?: {
    duration?: number;
    price?: number;
    origin?: string;
    destination?: string;
    departureDateTime?: string;
    arrivalDateTime?: string;
    id?: string;
    airline?: string;
    class?: string;
    flightNumber?: string;
  }[];
}

/**
 * abcd
 */
export type CarouselTwo = {
  body?: string;
  title?: string;
  url?: string;
}[];

export interface CreditCardSummary {
  firstName?: string;
  lastName?: string;
  last4Digits?: string;
}

export interface DatePicker {
  title?: string;
}

export interface Carousel {
  Body?: string;
  Summary?: string;
  Title?: string;
}

export interface Documents {}

export interface SMS {
  /**
   * A short message, ideally less than 255 characters.
   */
  message?: string;
}

export interface X1 {
  actionUrl?: string;
  description?: string;
  actionText?: string;
  title?: string;
  imageUrl?: string;
}

export interface PredictiveCard {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface Video {
  /**
   * Contains the URL
   */
  url?: string;
}

