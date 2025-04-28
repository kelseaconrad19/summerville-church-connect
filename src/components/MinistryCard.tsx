
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MinistryCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  buttonText?: string;
  onClick?: () => void;
}

const MinistryCard = ({ 
  title, 
  description, 
  image, 
  link = "#", 
  buttonText = "Learn More",
  onClick
}: MinistryCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button 
          asChild={!onClick}
          className="bg-church-blue hover:bg-blue-500"
          onClick={onClick}
        >
          {onClick ? (
            <span>{buttonText}</span>
          ) : (
            <Link to={link}>{buttonText}</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MinistryCard;
