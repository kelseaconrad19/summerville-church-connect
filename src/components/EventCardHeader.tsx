
import { formatLocation } from "@/lib/utils/formatters";
import { format } from "date-fns";

interface EventCardHeaderProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
}

const EventCardHeader = ({ title, date, time, location }: EventCardHeaderProps) => {
  const formattedTime = time
    ? format(new Date(`1970-01-01T${time}`), "h:mm a") // Format time to "1:30" or "11:30"
    : undefined;
  const formattedLocation = location ? formatLocation(location) : undefined;
  
  return (
    <div>
      <div className="text-sm text-church-blue font-medium mb-2">
        {date} {formattedTime && `• ${formattedTime}`}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {formattedLocation && formattedLocation !== "Location TBD" && (
        <div className="text-sm text-gray-500 mb-2">{formattedLocation}</div>
      )}
    </div>
  );
};

export default EventCardHeader;
