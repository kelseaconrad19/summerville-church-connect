
import { formatLocation } from "@/lib/utils/formatters";

interface EventCardHeaderProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string | any;
}

const EventCardHeader = ({ title, date, time, location }: EventCardHeaderProps) => {
  const formattedLocation = location ? formatLocation(location) : undefined;
  
  return (
    <div>
      <div className="text-sm text-church-blue font-medium mb-2">
        {date} {time && `• ${time}`}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {formattedLocation && formattedLocation !== "Location TBD" && (
        <div className="text-sm text-gray-500 mb-2">{formattedLocation}</div>
      )}
    </div>
  );
};

export default EventCardHeader;
