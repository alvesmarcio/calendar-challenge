// context adjusted from Jack Herrington, from YouTube

// use this context to move events around.
// get add, edit and delete event functions here and adjust the context.

import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export default function createEventContext(initialEvents) {
  function useEventStoreData() {
    const eventStore = useRef(initialEvents);

    const get = useCallback(() => eventStore.current, []);

    const subscribers = useRef(new Set());

    const set = useCallback((value) => {
      eventStore.current = { ...eventStore.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const EventStoreContext = createContext(null);

  function EventProvider({ children }) {
    return (
      <EventStoreContext.Provider value={useEventStoreData()}>
        {children}
      </EventStoreContext.Provider>
    );
  }

  function useEventStore(selector) {
    const eventStore = useContext(EventStoreContext);
    if (!eventStore) {
      throw new Error("Store not found");
    }

    const event = useSyncExternalStore(
      eventStore.subscribe,
      () => selector(eventStore.get()),
      () => selector(initialEvents)
    );

    return [event, eventStore.set];
  }

  return {
    EventProvider,
    useEventStore,
  };
}
