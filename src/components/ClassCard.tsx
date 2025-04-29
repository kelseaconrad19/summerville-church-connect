
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClassWithMinistry } from "@/lib/types/classes";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ClassCardProps {
  classItem: ClassWithMinistry;
}

const ClassCard = ({ classItem }: ClassCardProps) => {
  // Format dates if they exist
  const formattedStartDate = classItem.start_date ? format(new Date(classItem.start_date), 'MMM d, yyyy') : null;
  const formattedEndDate = classItem.end_date ? format(new Date(classItem.end_date), 'MMM d, yyyy') : null;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {classItem.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={classItem.image_url} 
            alt={classItem.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1">{classItem.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>Teacher: {classItem.teacher}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>Location: {classItem.location}</span>
          <span className="mx-2">•</span>
          <span>Time: {classItem.time}</span>
        </div>
        
        {(formattedStartDate || formattedEndDate) && (
          <div className="text-sm text-gray-500 mb-3">
            {formattedStartDate && <span>Starts: {formattedStartDate}</span>}
            {formattedStartDate && formattedEndDate && <span className="mx-2">•</span>}
            {formattedEndDate && <span>Ends: {formattedEndDate}</span>}
          </div>
        )}
        
        <p className="text-gray-600 mb-4 flex-grow">{classItem.description}</p>
        
        {classItem.ministry && (
          <div className="mt-auto">
            <Button 
              variant="outline"
              className="border-church-blue text-church-blue hover:bg-church-light-blue"
              asChild
            >
              <Link to={`/ministries#${classItem.ministry_id}`}>
                Related Ministry: {classItem.ministry.title}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassCard;
