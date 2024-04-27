export type event = {
  idevents?: number;
  title: string;
  description?: string;
  address: string;
  max_capacity: number;
  event_date: string;
};

export type nearbyEvent = {
  idevents: number;
  distance: number;
};
