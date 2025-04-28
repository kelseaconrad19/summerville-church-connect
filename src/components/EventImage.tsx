
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface EventImageProps {
  imageUrl?: string;
  altText: string;
}

const EventImage = ({ imageUrl, altText }: EventImageProps) => {
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

  if (!imageUrl) return null;

  return (
    <div className="h-48 overflow-hidden">
      <AspectRatio ratio={16/9}>
        <img 
          src={getImageUrl(imageUrl)}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </AspectRatio>
    </div>
  );
};

export default EventImage;
