
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerForEvent } from "@/lib/api/events";
import type { Event } from "@/lib/types/events";

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
  const { user } = useAuth();
  const { toast } = useToast();

  // Handle both direct event object and legacy props
  const eventTitle = event?.title || title;
  const eventDescription = event?.description || description;
  const eventImage = event?.image_url || image;
  
  // Support both date formats
  const formattedDate = event?.date_start 
    ? new Date(event.date_start).toLocaleDateString()
    : date;
  
  const formattedTime = event?.time_start || time || "";

  // Format location function
  const formatLocation = (location: string | any): string => {
    if (!location) return "Location TBD";
    
    // If location is a string, return it directly
    if (typeof location === 'string' && !location.startsWith('{')) return location;
    
    // If it's an object (from AddressAutocomplete) or a JSON string, format it properly
    try {
      const locationObj = typeof location === 'string' ? JSON.parse(location) : location;
      const parts = [];
      
      if (locationObj.address1) parts.push(locationObj.address1);
      if (locationObj.address2) parts.push(locationObj.address2);
      if (locationObj.city) parts.push(locationObj.city);
      if (locationObj.state) parts.push(locationObj.state);
      if (locationObj.postalCode) parts.push(locationObj.postalCode);
      
      return parts.length > 0 ? parts.join(', ') : "Location TBD";
    } catch (e) {
      // If parsing fails, return the original location string
      return typeof location === 'string' ? location : "Location TBD";
    }
  };

  // Get formatted location
  const eventLocation = event?.location ? formatLocation(event.location) : "Location TBD";

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to register for events.",
        variant: "destructive",
      });
      return;
    }

    if (!event?.id) {
      toast({
        title: "Error",
        description: "Invalid event information",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerForEvent(event.id);
      toast({
        title: "Success!",
        description: "You have been registered for this event.",
      });
      onRegister?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {eventImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={eventImage} 
            alt={eventTitle} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="text-sm text-church-blue font-medium mb-2">
          {formattedDate} {formattedTime && `• ${formattedTime}`}
        </div>
        <h3 className="text-xl font-bold mb-2">{eventTitle}</h3>
        {eventLocation !== "Location TBD" && (
          <div className="text-sm text-gray-500 mb-2">{eventLocation}</div>
        )}
        <p className="text-gray-600 mb-4">{eventDescription}</p>
        {event?.requires_registration && (
          <Button 
            className="bg-church-blue hover:bg-blue-500 w-full"
            onClick={handleRegister}
          >
            Register Now
          </Button>
        )}
        {(!event || !event.requires_registration) && (
          <Button 
            className="bg-church-blue hover:bg-blue-500 w-full"
          >
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
