
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerForEvent } from "@/lib/api/events";
import type { Event } from "@/lib/types/events";

interface EventCardProps {
  event: Event;
  onRegister?: () => void;
}

const EventCard = ({ event, onRegister }: EventCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to register for events.",
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

  const formattedDate = new Date(event.date_start).toLocaleDateString();
  const formattedTime = event.time_start || "";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {event.image_url && (
        <div className="h-48 overflow-hidden">
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="text-sm text-church-blue font-medium mb-2">
          {formattedDate} {formattedTime && `• ${formattedTime}`}
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        {event.requires_registration && (
          <Button 
            className="bg-church-blue hover:bg-blue-500 w-full"
            onClick={handleRegister}
          >
            Register Now
          </Button>
        )}
        {!event.requires_registration && (
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
