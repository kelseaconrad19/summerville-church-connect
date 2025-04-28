
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import type { Event } from "@/lib/types/events";
import EventImage from "./EventImage";
import EventCardHeader from "./EventCardHeader";
import EventCardFooter from "./EventCardFooter";

interface EventCardProps {
  event: Event;
  onRegister?: () => void;
  // Legacy props support for HomePage
  title?: string;
  date?: string;
  time?: string;
  description?: string;
  image?: string;
}

const EventCard = ({ event, onRegister, title, date, time, description, image }: EventCardProps) => {
  // Handle both direct event object and legacy props
  const eventTitle = event?.title || title;
  const eventDescription = event?.description || description;
  const eventImage = event?.image_url || image;
  
  // Support both date formats
  const formattedDate = event?.date_start 
    ? new Date(event.date_start).toLocaleDateString()
    : date;
  
  const formattedTime = event?.time_start || time || "";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <EventImage imageUrl={eventImage} altText={eventTitle || "Event"} />
      
      <CardContent className="p-6">
        <EventCardHeader 
          title={eventTitle}
          date={formattedDate}
          time={formattedTime}
          location={event?.location}
        />
        
        <p className="text-gray-600 mb-4">{eventDescription}</p>
        
        <EventCardFooter 
          eventId={event?.id}
          requiresRegistration={event?.requires_registration}
          onRegister={onRegister}
        />
      </CardContent>
    </Card>
  );
};

export default EventCard;
