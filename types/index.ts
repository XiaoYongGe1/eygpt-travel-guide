export interface Artifact {
  name: string;
  image?: string;
  description: string;
}

export interface Attraction {
  name: string;
  time?: string;
  duration?: string;
  ticketPrice?: string;
  ticketTip?: string;
  history: string;
  visitTips?: string[];
  image?: string;
  artifacts?: Artifact[];
  subAttractions?: SubAttraction[];
}

export interface SubAttraction {
  name: string;
  description: string;
  image?: string;
  coordinates?: [number, number];
}

export interface Restaurant {
  name: string;
  cuisine?: string;
  priceRange?: string;
  description: string;
  recommendation?: string;
}

export interface Tip {
  category: string;
  content: string;
  important?: boolean;
}

export interface Alternative {
  title: string;
  description: string;
  condition?: string;
}

export interface Expense {
  item: string;
  amount: string;
  currency: 'EGP' | 'USD' | 'CNY';
  note?: string;
}

export interface DaySchedule {
  day: number;
  date: string;
  location: string;
  hotel?: string;
  hotelNote?: string;
  schedule: {
    time: string;
    activity: string;
    attraction?: Attraction;
  }[];
  restaurants: Restaurant[];
  tips: Tip[];
  alternatives: Alternative[];
  expenses: Expense[];
  generalNotes?: string[];
}

export interface ItineraryData {
  title: string;
  subtitle: string;
  days: DaySchedule[];
  generalTips: Tip[];
}
