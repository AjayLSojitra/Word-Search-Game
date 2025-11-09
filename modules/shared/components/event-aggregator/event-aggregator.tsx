import { create } from "zustand";
import { useEffect } from "react";

interface EventStore {
  events: Record<string, object>;
  publishEvent: (event: object) => void;
  getEvent: (eventName: string) => object | undefined;
}

const useEventStore = create<EventStore>((set, get) => ({
  events: {},
  publishEvent: (event: object) => {
    const eventName = event?.constructor?.name;
    if (!eventName) return;
    set((state) => ({
      events: {
        ...state.events,
        [eventName]: event,
      },
    }));
  },
  getEvent: (eventName: string) => {
    return get().events[eventName];
  },
}));

export function useEventPublisher() {
  return useEventStore((state) => state.publishEvent);
}

export interface EventAggregatorProps {
  eventToSubscribe: string;
  onEventReceived: (eventName: string, value: object) => void;
}

export function EventAggregator(props: Readonly<EventAggregatorProps>) {
  const event = useEventStore((state) =>
    state.getEvent(props.eventToSubscribe)
  );
  useEffect(() => {
    if (!event) return;
    props.onEventReceived(props.eventToSubscribe, event);
  }, [event]);
  return <></>;
}
