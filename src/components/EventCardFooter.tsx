
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerForEvent } from "@/lib/api/events";

interface EventCardFooterProps {
  eventId?: string;
  requiresRegistration?: boolean;
  onRegister?: () => void;
}

const EventCardFooter = ({ eventId, requiresRegistration, onRegister }: EventCardFooterProps) => {
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

    if (!eventId) {
      toast({
        title: "Error",
        description: "Invalid event information",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerForEvent(eventId);
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

  if (requiresRegistration) {
    return (
      <Button 
        className="bg-church-blue hover:bg-blue-500 w-full"
        onClick={handleRegister}
      >
        Register Now
      </Button>
    );
  }

  return (
    <Button className="bg-church-blue hover:bg-blue-500 w-full">
      Learn More
    </Button>
  );
};

export default EventCardFooter;
