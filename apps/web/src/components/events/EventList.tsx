import React from 'react';
import EventCard from '../feed/EventCard';

export function EventList({ events }: { events: any[] }) {
  if (!events || events.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}
