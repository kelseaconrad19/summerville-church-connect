
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerForEvent } from "@/lib/api/events";
import type { Event } from "@/lib/types/events";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  // Check if the image URL is valid
  const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    
    // Check if it's a Google redirect URL and extract the actual image URL
    if (url.includes('google.com/url')) {
      try {
        const urlObj = new URL(url);
        const actualUrl = urlObj.searchParams.get('url');
        return !!actualUrl;
      } catch (e) {
        return false;
      }
    }
    
    // Basic URL validation
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Get proper image URL or fallback
  const getImageUrl = (url: string | undefined): string => {
    if (!url) return 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80';
    
    // If it's a Google redirect URL, try to extract the actual URL
    if (url.includes('google.com/url')) {
      try {
        const urlObj = new URL(url);
        const actualUrl = urlObj.searchParams.get('url');
        return actualUrl || 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80';
      } catch (e) {
        return 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80';
      }
    }
    
    return url;
  };

  // Format location function
  const formatLocation = (location: string | any): string => {
    if (!location) return "Location TBD";
    
    // If location is a string, try to parse it as JSON
    if (typeof location === 'string') {
      try {
        // Try to parse as JSON
        const parsedLocation = JSON.parse(location);
        
        // If parsing succeeds, format the object
        const parts = [];
        if (parsedLocation.address1) parts.push(parsedLocation.address1);
        if (parsedLocation.city) parts.push(parsedLocation.city);
        if (parsedLocation.state) parts.push(parsedLocation.state);
        if (parsedLocation.postalCode) parts.push(parsedLocation.postalCode);
        
        return parts.length > 0 ? parts.join(', ') : "Location TBD";
      } catch (e) {
        // If parsing fails, it's not JSON, so return the original string
        return location;
      }
    }
    
    // If location is already an object
    if (typeof location === 'object' && location !== null) {
      const parts = [];
      if (location.address1) parts.push(location.address1);
      if (location.city) parts.push(location.city);
      if (location.state) parts.push(location.state);
      if (location.postalCode) parts.push(location.postalCode);
      
      return parts.length > 0 ? parts.join(', ') : "Location TBD";
    }
    
    return "Location TBD";
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
          <AspectRatio ratio={16/9}>
            <img 
              src={getImageUrl(eventImage)}
              alt={eventTitle || "Event"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </AspectRatio>
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
