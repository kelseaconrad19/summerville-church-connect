
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api/events";
import EventCard from "@/components/EventCard";

const EventCards = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => fetchEvents("upcoming"),
  });

  if (isLoading) {
    return (
      <div className="col-span-3 text-center py-8">
        Loading upcoming events...
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="col-span-3 text-center py-8">
        No upcoming events found
      </div>
    );
  }

  // Show only the first 3 upcoming events
  const upcomingEvents = events.slice(0, 3);

  return (
    <>
      {upcomingEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </>
  );
};

export default EventCards;
