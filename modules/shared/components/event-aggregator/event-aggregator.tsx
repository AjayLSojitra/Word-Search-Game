import { v4 as uuidv4 } from 'uuid';
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react';

export function useEventPublisher() {
    return useSetRecoilState(eventStore);
}

export interface EventAggregatorProps {
    eventToSubscribe: string;
    onEventReceived: (eventName: string, value: object) => void;
}

export function EventAggregator(props: Readonly<EventAggregatorProps>) {
    const event = useRecoilValue<object>(useEventState(props.eventToSubscribe));
    useEffect(() => {
        if (!event) return;
        props.onEventReceived(props.eventToSubscribe, event);
    }, [event]);
    return <></>
}

const eventStoreState = atom({
    key: "eventStore",
    default: {}
});

const eventStore = selector({
    key: 'events',
    get: ({ get }) => get(eventStoreState),
    set: ({ set, get }, event: object) => {
        const eventStore = get(eventStoreState);
        const eventName = event?.constructor?.name;
        if (!eventName) return;
        set(eventStoreState, {
            ...eventStore,
            [eventName]: event
        });
    }
});

const eventStateSelectorMap = {};

function useEventState(eventName: string) {
    eventStateSelectorMap[eventName] = eventStateSelectorMap[eventName] ?? selector({
        key: `${eventName}-${uuidv4()}`,
        get: ({ get }) => get(eventStore)[eventName],
    });
    return eventStateSelectorMap[eventName];
}
