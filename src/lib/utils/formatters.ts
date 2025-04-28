
/**
 * Formats location data into a readable string
 */
export const formatLocation = (location: string | any): string => {
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
