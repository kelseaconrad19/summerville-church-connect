
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  className?: string;
}

const PageHeader = ({ title, description, backgroundImage, className }: PageHeaderProps) => {
  return (
    <div 
      className={cn(
        "bg-church-light-blue py-16 md:py-24 px-4 text-center relative",
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-gray-700 animate-fade-in">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
